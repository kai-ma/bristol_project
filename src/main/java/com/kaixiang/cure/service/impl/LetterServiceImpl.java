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
import com.kaixiang.cure.utils.encrypt.EncryptUtils;
import com.kaixiang.cure.utils.validator.ValidationResult;
import com.kaixiang.cure.utils.validator.ValidatorImpl;
import org.joda.time.DateTime;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Override
    public void sendFirstLetter(FirstLetterModel firstLetterModel) throws BusinessException {
        //校验Model
        ValidationResult result = validator.validate(firstLetterModel);
        if (result.isHasErrors()) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR, result.getErrMsg());
        }
        FirstLetterDO firstLetterDO = convertDataObjectFromModel(firstLetterModel);
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
            List<FirstLetterDO> firstLetterDOList = firstLetterDOMapper.listMyFirstLetters(encryptUtils.encrypt(String.valueOf(userid)));
            return firstLetterDOList.stream().map(this::convertModelFromDataObject).collect(Collectors.toList());
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    @Override
    public List<FirstLetterModel> getLettersInHomePage(Integer userid) throws BusinessException {
        if (userid == null) {
            return null;
        }
        try {
            List<FirstLetterDO> firstLetterDOList = firstLetterDOMapper.listFirstLettersNotMine(encryptUtils.encrypt(String.valueOf(userid)));
            return firstLetterDOList.stream().map(this::convertModelFromDataObject).collect(Collectors.toList());
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
            letterModel.setAddresseeUserId(Integer.valueOf(encryptUtils.decrypt(firstLetterDO.getUserid())));
            //2.存储conversation，获取conversationId
            ConversationDO conversationDO = convertor.conversationDOFromLetterModel(letterModel);
            conversationDOMapper.insertSelective(conversationDO);
            //3.存储letter
            LetterDO letterDO = convertor.letterDOFromLetterModel(letterModel);
            letterDO.setConversationId(conversationDO.getId());
            letterDOMapper.insertSelective(letterDO);
        } catch (DuplicateKeyException e) {
            throw new BusinessException(EnumBusinessError.DUPLICATE_REPLY_TO_FIRST_LETTER);
        }catch (Exception e){
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * 在这里完成转换  todo：存到文件
     */
    private FirstLetterDO convertDataObjectFromModel(FirstLetterModel firstLetterModel) {
        if (firstLetterModel == null) {
            return null;
        }
        FirstLetterDO firstLetterDO = new FirstLetterDO();
        BeanUtils.copyProperties(firstLetterModel, firstLetterDO);
        firstLetterDO.setUserid(encryptUtils.encrypt(String.valueOf(firstLetterModel.getUserId())));
        firstLetterDO.setFilepath(firstLetterModel.getContent());
        return firstLetterDO;
    }


    private FirstLetterModel convertModelFromDataObject(FirstLetterDO firstLetterDO) {
        if (firstLetterDO == null) {
            return null;
        }
        FirstLetterModel firstLetterModel = new FirstLetterModel();
        BeanUtils.copyProperties(firstLetterDO, firstLetterModel);
        firstLetterModel.setCreatedAt(new DateTime(firstLetterDO.getCreatedAt()));
        if (firstLetterDO.getReplyNumber() != null && firstLetterDO.getReplyNumber() != 0) {
            firstLetterModel.setLastRepliedAt(new DateTime(firstLetterDO.getLastRepliedAt()));
        }
        firstLetterModel.setContent(getContent(firstLetterDO.getFilepath()));
        firstLetterModel.setUserId(Integer.valueOf(encryptUtils.decrypt(firstLetterDO.getUserid())));
        return firstLetterModel;
    }


    /**
     * todo: 从文件中获取内容
     */
    private String getContent(String filePath) {
        return filePath;
    }
}
