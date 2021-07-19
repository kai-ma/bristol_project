package com.kaixiang.cure.service.impl;

import com.kaixiang.cure.dao.AnswerBookDOMapper;
import com.kaixiang.cure.dao.ConversationDOMapper;
import com.kaixiang.cure.dao.FirstLetterDOMapper;
import com.kaixiang.cure.dao.TopicDOMapper;
import com.kaixiang.cure.dataobject.AnswerBookDO;
import com.kaixiang.cure.dataobject.ConversationDO;
import com.kaixiang.cure.dataobject.FirstLetterDO;
import com.kaixiang.cure.dataobject.TopicDO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.service.AnswerBookService;
import com.kaixiang.cure.service.LetterService;
import com.kaixiang.cure.service.model.ConversationModel;
import com.kaixiang.cure.service.model.FirstLetterModel;
import com.kaixiang.cure.service.model.TopicModel;
import com.kaixiang.cure.utils.Convertor;
import com.kaixiang.cure.utils.encrypt.EncryptUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @description: AnswerBookServiceImpl.java: AnswerBookService实现类
 * @author: Kaixiang Ma
 * @create: 2021-07-19 01:01
 */
@Service
public class AnswerBookServiceImpl implements AnswerBookService {
    @Autowired
    private TopicDOMapper topicDOMapper;
    @Autowired
    private Convertor convertor;
    @Autowired
    private AnswerBookDOMapper answerBookDOMapper;
    @Autowired
    private ConversationDOMapper conversationDOMapper;
    @Autowired
    private FirstLetterDOMapper firstLetterDOMapper;
    @Autowired
    private LetterService letterService;
    @Autowired
    private EncryptUtils encryptUtils;
    @Override
    public List<TopicModel> listAllTopics() throws BusinessException {
        try {
            List<TopicDO> topicDOList = topicDOMapper.listAllTopics();
            return topicDOList.stream().map(topicDO -> convertor.topicModelFromTopicDO(topicDO)
            ).collect(Collectors.toList());
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    @Override
    public List<ConversationModel> listConversationByTopicId(Integer topicId) throws BusinessException {
        //todo:存到redis当中
        try {
            List<AnswerBookDO> answerBookDOList = answerBookDOMapper.selectByTopicId(topicId);
            if (answerBookDOList == null) {
                throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
            }
            List<ConversationModel> conversationModelList = new ArrayList<>();
            for(AnswerBookDO answerBookDO: answerBookDOList){
                conversationModelList.add(getConversationModelByAnswerBookDO(answerBookDO));
            }
            return conversationModelList;
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }


    private ConversationModel getConversationModelByAnswerBookDO(AnswerBookDO answerBookDO) throws BusinessException {
        ConversationDO conversationDO = conversationDOMapper.selectByPrimaryKey(answerBookDO.getConversationId());
        if(conversationDO == null){
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
        ConversationModel conversationModel = new ConversationModel();
        BeanUtils.copyProperties(conversationDO, conversationModel);
        conversationModel.setAddresseeUserid(Integer.valueOf(encryptUtils.decrypt(conversationDO.getEncryptAddresseeUserid())));
        conversationModel.setSenderUserid(Integer.valueOf(encryptUtils.decrypt(conversationDO.getEncryptSenderUserid())));
        FirstLetterDO firstLetterDO = firstLetterDOMapper.selectByPrimaryKey(conversationDO.getFirstLetterId());
        FirstLetterModel firstLetterModel = convertor.firstLetterModelFromFirstLetterDO(firstLetterDO, conversationDO.getId());
        conversationModel.setFirstLetterModel(firstLetterModel);
        conversationModel.setRestLetterList(letterService.getRestLettersOfConversation(conversationDO.getId()));
        return conversationModel;
    }
}
