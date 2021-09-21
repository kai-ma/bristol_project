package com.kaixiang.cure.service.impl;

import com.kaixiang.cure.dao.*;
import com.kaixiang.cure.dataobject.*;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.service.LetterService;
import com.kaixiang.cure.service.model.FirstLetterModel;
import com.kaixiang.cure.service.model.LetterModel;
import com.kaixiang.cure.service.model.RecommendModel;
import com.kaixiang.cure.utils.Convertor;
import com.kaixiang.cure.utils.encrypt.EncryptUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


/**
 * @description: LetterServiceImpl.java: LetterService实现类
 * @author: Kaixiang Ma
 */
@Service
public class LetterServiceImpl implements LetterService {
    @Autowired
    private ConversationDOMapper conversationDOMapper;
    @Autowired
    private LetterDOMapper letterDOMapper;
    @Autowired
    private FirstLetterMetaDOMapper firstLetterMetaDOMapper;
    @Autowired
    private EncryptUtils encryptUtils;
    @Autowired
    private Convertor convertor;
    @Autowired
    private UserDOMapper userDOMapper;
    @Autowired
    private RedisTemplate redisTemplate;
    @Autowired
    private RecommendDOMapper recommendDOMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void sendFirstLetter(FirstLetterModel firstLetterModel) throws BusinessException {
        if (firstLetterModel == null) {
            return;
        }

        costStamp(firstLetterModel, firstLetterModel.getUserId());

        LetterDO letterDO = convertor.letterDOFromFirstLetterModel(firstLetterModel);
        int rows = letterDOMapper.insertSelective(letterDO);
        if (rows != 1) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }

        FirstLetterMetaDO firstLetterMetaDO = convertor.firstLetterMetaDOFromFirstLetterModel(firstLetterModel);
        firstLetterMetaDO.setLetterId(letterDO.getId());
        firstLetterMetaDOMapper.insertSelective(firstLetterMetaDO);
    }

    /**
     * 获取所有我发出的第一封信
     */
    @Override
    public List<FirstLetterModel> getMyFirstLetters(Integer userid) throws BusinessException {
        if (userid == null) {
            throw new BusinessException(EnumBusinessError.TOKEN_ILLEGAL);
        }
        try {
            String encryptUserId = encryptUtils.encrypt(String.valueOf(userid));
            List<FirstLetterMetaDO> firstLetterMetaDOS = firstLetterMetaDOMapper.listMyFirstLetterMetas(encryptUserId);
            return fetchFirstLetterModelsByMetaDOs(firstLetterMetaDOS);
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
            throw new BusinessException(EnumBusinessError.TOKEN_ILLEGAL);
        }
        try {
            String encryptUserId = encryptUtils.encrypt(String.valueOf(userid));
            List<FirstLetterMetaDO> firstLetterMetaDOS = firstLetterMetaDOMapper.listMetasInHomePage(encryptUserId);

            return fetchFirstLetterModelsByMetaDOs(firstLetterMetaDOS);
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    //论文：多写的 事务可以写到论文中
    public void replyFirstLetter(LetterModel letterModel) throws BusinessException {
        if (letterModel == null) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR);
        }

        try {
            //1. 查询剩余的stamps  todo:可以在登录的时候放到redis中
            costStamp(letterModel, null);

            //1.根据要回复的 首封信的id，查询firstLetterMeta信息，获取对方的userId  同时回复数量+1。
            FirstLetterMetaDO firstLetterMetaDO = firstLetterMetaDOMapper.selectByLetterId(letterModel.getFirstLetterId());
            if (firstLetterMetaDO == null) {
                throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION.setDescription("根据首封信的id，查询first_letter_meta失败"));
            }
            firstLetterMetaDO.setReplyNumber(firstLetterMetaDO.getReplyNumber() + 1);
            firstLetterMetaDOMapper.updateByPrimaryKeySelective(firstLetterMetaDO);

            letterModel.setAddresseeUserId(Integer.valueOf(encryptUtils.decrypt(firstLetterMetaDO.getEncryptUserId())));

            //2.存储conversation，获取conversationId
            ConversationDO conversationDO = convertor.conversationDOFromLetterModel(letterModel);
            int row = conversationDOMapper.insertSelective(conversationDO);
            if (row != 1) {
                throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION.setDescription("conversationId 获取失败"));
            }

            //3.存储letter
            LetterDO letterDO = convertor.letterDOFromLetterModel(letterModel);
            letterDO.setConversationId(conversationDO.getId());
            letterDOMapper.insertSelective(letterDO);
        } catch (DuplicateKeyException e) {
            throw new BusinessException(EnumBusinessError.DUPLICATE_REPLY_TO_FIRST_LETTER);
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
            List<FirstLetterModel> firstLetterModels = new ArrayList<>();

            String encryptAddresseeUserid = encryptUtils.encrypt(String.valueOf(userid));
            //1. 根据addresseeUserid，查询conversation表 获取全部的我回复的ConversationDO
            List<ConversationDO> conversationDOList = conversationDOMapper.listConversationsIReplied(encryptAddresseeUserid);

            //2. 根据ConversationDO的firstLetterIds，批量查询first_letter_meta表
            List<Integer> letterIds = new ArrayList<>();
            Map<Integer, Integer> letterId2ConversationId = new HashMap<>();
            for (ConversationDO conversationDO : conversationDOList) {
                letterIds.add(conversationDO.getFirstLetterId());
                letterId2ConversationId.put(conversationDO.getFirstLetterId(), conversationDO.getId());
            }

            if(letterIds.size() > 0){
                List<FirstLetterMetaDO> firstLetterMetaDOS = firstLetterMetaDOMapper.selectByLetterIds(letterIds);
                firstLetterModels = fetchFirstLetterModelsByMetaDOs(firstLetterMetaDOS);
            }

            for(FirstLetterModel firstLetterModel : firstLetterModels){
                firstLetterModel.setConversationId(letterId2ConversationId.get(firstLetterModel.getId()));
            }

            return firstLetterModels;
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    /**
     * 根据firstLetterId，获取剩余的回复的letter
     *
     * @param conversationId
     */
    @Override
    public List<LetterModel> getReplyLetters(Integer conversationId) throws BusinessException {
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
            if(conversationDO != null){
                //2. 根据conversationId，获取letterDOs
                List<LetterDO> letterDOS = letterDOMapper.listLettersByConversationId(conversationDO.getId());
                return letterDOS.stream().map(letterDO -> convertor.letterModelFromLetterDO(letterDO)
                ).collect(Collectors.toList());
            }
            return new ArrayList<>();

        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    @Override
    public void recommend(RecommendModel recommendModel) throws BusinessException {
        if (recommendModel == null) {
            throw new BusinessException(EnumBusinessError.UNKNOWN_ERROR);
        }

        RecommendDO recommendDO = convertor.recommendDOFromModel(recommendModel);
        try {
            recommendDOMapper.insertSelective(recommendDO);
        } catch (DuplicateKeyException e) {
            throw new BusinessException(EnumBusinessError.DUPLICATE_REPORT);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * 根据firstLetterMetaDO的list，获取对应的LetterDO，然后组装成FirstLetterModel的list
     */
    private List<FirstLetterModel> fetchFirstLetterModelsByMetaDOs(List<FirstLetterMetaDO> firstLetterMetaDOS) {
        Map<Integer, FirstLetterMetaDO> letterId2FirstLetterMeta = new HashMap<>();
        List<FirstLetterModel> firstLetterModels = new ArrayList<>();
        List<Integer> ids = new ArrayList<>();
        for (FirstLetterMetaDO firstLetterMetaDO : firstLetterMetaDOS) {
            Integer letterId = firstLetterMetaDO.getLetterId();
            ids.add(letterId);
            letterId2FirstLetterMeta.put(letterId, firstLetterMetaDO);
        }
        if (ids.size() > 0) {
            List<LetterDO> letterDOS = letterDOMapper.selectByIds(ids);
            for (LetterDO letterDO : letterDOS) {
                FirstLetterMetaDO firstLetterMetaDO = letterId2FirstLetterMeta.get(letterDO.getId());
                firstLetterModels.add(convertor.firstLetterModelFromDOAndMeta(firstLetterMetaDO, letterDO));
            }
        }
        return firstLetterModels;
    }

    /**
     * 查询user表，检查stamp是否够，并扣减
     */
    private void costStamp(LetterModel letterModel, Integer userId) throws BusinessException {
        //1. 查询剩余的stamps  todo:可以在登录的时候放到redis中
        if(userId == null){
            userId = letterModel.getSenderUserId();
        }
        UserDO userDO = userDOMapper.selectByPrimaryKey(userId);
        if (userDO == null) {
            throw new BusinessException(EnumBusinessError.USER_NOT_EXIST.setDescription("查询用户信息，获取剩余stamps失败"));
        }
        if (userDO.getStamp() == null) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION.setDescription("stamp为空"));
        }
        if (userDO.getStamp() <= 0) {
            throw new BusinessException(EnumBusinessError.STAMPS_NOT_ENOUGH);
        } else {
            userDO.setStamp(userDO.getStamp() - 1);
            int rows = userDOMapper.updateByPrimaryKeySelective(userDO);
            if (rows != 1) {
                throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION.setDescription("扣减邮票数失败"));
            }
        }
    }
}
