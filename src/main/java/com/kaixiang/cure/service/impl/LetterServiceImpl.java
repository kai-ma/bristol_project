package com.kaixiang.cure.service.impl;

import com.kaixiang.cure.dao.ConversationDOMapper;
import com.kaixiang.cure.dao.FirstLetterDOMapper;
import com.kaixiang.cure.dao.LetterDOMapper;
import com.kaixiang.cure.dataobject.ConversationDO;
import com.kaixiang.cure.dataobject.FirstLetterDO;
import com.kaixiang.cure.dataobject.LetterDO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.service.LetterService;
import com.kaixiang.cure.service.model.FirstLetterModel;
import com.kaixiang.cure.service.model.LetterModel;
import com.kaixiang.cure.utils.Convertor;
import com.kaixiang.cure.utils.RedisUtils;
import com.kaixiang.cure.utils.encrypt.EncryptUtils;
import com.kaixiang.cure.utils.validator.ValidationResult;
import com.kaixiang.cure.utils.validator.ValidatorImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


/**
 * @description: LetterServiceImpl.java: LetterService实现类
 * @author: Kaixiang Ma
 */
@Service
public class LetterServiceImpl implements LetterService {
    @Autowired
    private ValidatorImpl validator;
    @Autowired
    private FirstLetterDOMapper firstLetterDOMapper;
    @Autowired
    private ConversationDOMapper conversationDOMapper;
    @Autowired
    private LetterDOMapper letterDOMapper;
    @Autowired
    private EncryptUtils encryptUtils;
    @Autowired
    private Convertor convertor;
    @Autowired
    private RedisTemplate redisTemplate;
    @Autowired
    private RedisUtils redisUtils;

    @Override
    public void sendFirstLetter(FirstLetterModel firstLetterModel) throws BusinessException {
        //校验Model
        ValidationResult result = validator.validate(firstLetterModel);
        if (result.isHasErrors()) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR, result.getErrMsg());
        }
        FirstLetterDO firstLetterDO = convertor.firstLetterDOFromModel(firstLetterModel);
        try {
            firstLetterDOMapper.insertSelective(firstLetterDO);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    /**
     * 获取所有我发出的第一封信
     */
    @Override
    public List<FirstLetterModel> getMyFirstLetters(Integer userid) throws BusinessException {
        if (userid == null) {
            return null;
        }
        try {
            String encryptUserId = encryptUtils.encrypt(String.valueOf(userid));
            List<FirstLetterDO> firstLetterDOList = firstLetterDOMapper.listMyFirstLetters(encryptUserId);
            return firstLetterDOList.stream().map(firstLetterDO -> convertor.firstLetterModelFromFirstLetterDO(firstLetterDO, null)
            ).collect(Collectors.toList());
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    /**
     * 获取首页的信 todo：存到redis做分发
     * 暂时读所有的，返回3条
     */
    @Override
    public List<FirstLetterModel> getLettersInHomePage(Integer userid) throws BusinessException {
        if (userid == null) {
            return null;
        }
        try {
            List<FirstLetterDO> firstLetterDOList = firstLetterDOMapper.listFirstLettersNotMine(encryptUtils.encrypt(String.valueOf(userid)));
            return firstLetterDOList.stream().map(firstLetterDO -> convertor.firstLetterModelFromFirstLetterDO(firstLetterDO, null)
            ).collect(Collectors.toList());
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void replyFirstLetter(LetterModel letterModel) throws BusinessException {
        if (letterModel == null) {
            throw new BusinessException(EnumBusinessError.UNKNOWN_ERROR);
        }
        try {
            //1.根据firstLetterId，查询firstLetterDO，获取对方的userId
            FirstLetterDO firstLetterDO = firstLetterDOMapper.selectByPrimaryKey(letterModel.getFirstLetterId());
            letterModel.setAddresseeUserId(Integer.valueOf(encryptUtils.decrypt(firstLetterDO.getEncryptUserId())));
            //2.存储conversation，获取conversationId
            ConversationDO conversationDO = convertor.conversationDOFromLetterModel(letterModel);
            conversationDOMapper.insertSelective(conversationDO);
            //3.存储letter
            LetterDO letterDO = convertor.letterDOFromLetterModel(letterModel);
            letterDO.setConversationId(conversationDO.getId());
            letterDOMapper.insertSelective(letterDO);
        } catch (DuplicateKeyException e) {
            throw new BusinessException(EnumBusinessError.DUPLICATE_REPLY_TO_FIRST_LETTER);
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    /**
     * 获取我回复的所有首封信
     *
     * @param userid
     */
    @Override
    public List<FirstLetterModel> getFirstLetterListIReplied(Integer userid) throws BusinessException {
        if (userid == null) {
            throw new BusinessException(EnumBusinessError.TOKEN_ILLEGAL);
        }
        try {
            //1. 根据addresseeUserid，查询conversation表 获取firstLetterId
            List<ConversationDO> conversationDOList = conversationDOMapper.listConversationsIReplied(encryptUtils.encrypt(String.valueOf(userid)));
            //2. 根据firstLetterId，查询first_letter表，获取first_letter
            List<FirstLetterModel> firstLetterModelList = new ArrayList<>();
            for (ConversationDO conversationDO : conversationDOList) {
                FirstLetterDO firstLetterDO = firstLetterDOMapper.selectByPrimaryKey(conversationDO.getFirstLetterId());
                if (firstLetterDO != null) {
                    firstLetterModelList.add(convertor.firstLetterModelFromFirstLetterDO(firstLetterDO, conversationDO.getId()));
                }
            }
            return firstLetterModelList;
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    /**
     * 根据conversationId，获取除了firstLetter以外的所有letter
     *
     * @param conversationId
     */
    @Override
    public List<LetterModel> getRestLettersOfConversation(Integer conversationId) throws BusinessException {
        if (conversationId == null) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        try {
            //1. 根据addresseeUserid和firstLetterId，查询conversation表 获取conversationId
            List<LetterDO> letterDOList = letterDOMapper.listLettersByConversationId(conversationId);
            return letterDOList.stream().map(letterDO -> convertor.letterModelFromLetterDO(letterDO)
            ).collect(Collectors.toList());
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    /**
     * 根据首封信获取回信  目前不支持继续回信，因此直接返回一个回信letterModel的列表
     */
    @Override
    public List<LetterModel> listRepliesByFirstLetterId(Integer firstLetterId) throws BusinessException {
        if (firstLetterId == null) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        try {
            //1. firstLetterId，查询conversation表，获取所有conversationId
            List<LetterDO> letterDOList = letterDOMapper.listLettersByFirstLetterId(firstLetterId);
            return letterDOList.stream().map(letterDO -> convertor.letterModelFromLetterDO(letterDO)
            ).collect(Collectors.toList());
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    /**
     * 获取回复：用于首页 点击某个信 显示信和信的回复
     *
     * @param userId
     * @param firstLetterId
     */
    @Override
    public List<LetterModel> listMyRepliesByFirstLetterId(Integer userId, Integer firstLetterId) throws BusinessException {
        if (userId == null || firstLetterId == null) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        try {
            //1. 根据addresseeUserid，查询conversation表 获取我回复的conversationId
            ConversationDO conversationDO = conversationDOMapper.getMyConversationByFirstLetterId(encryptUtils.encrypt(String.valueOf(userId)), firstLetterId);
            //2. 根据conversationId，获取letterDOs
            List<LetterDO> letterDOS = letterDOMapper.listLettersByConversationId(conversationDO.getId());
            return letterDOS.stream().map(letterDO -> convertor.letterModelFromLetterDO(letterDO)
            ).collect(Collectors.toList());
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
}
