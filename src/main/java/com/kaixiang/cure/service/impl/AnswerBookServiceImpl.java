package com.kaixiang.cure.service.impl;

import com.kaixiang.cure.dao.*;
import com.kaixiang.cure.dataobject.*;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.service.AnswerBookService;
import com.kaixiang.cure.service.LetterService;
import com.kaixiang.cure.service.TagService;
import com.kaixiang.cure.service.model.ConversationModelInAnswerBook;
import com.kaixiang.cure.service.model.FirstLetterModel;
import com.kaixiang.cure.service.model.TopicModel;
import com.kaixiang.cure.utils.Convertor;
import com.kaixiang.cure.utils.encrypt.EncryptUtils;
import org.joda.time.DateTime;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    @Autowired
    private ConversationTagDOMapper conversationTagDOMapper;
    @Autowired
    private TagService tagService;

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
    public List<ConversationModelInAnswerBook> listConversationByTopicId(Integer topicId) throws BusinessException {
        //todo:存到redis当中
        try {
            List<AnswerBookDO> answerBookDOList = answerBookDOMapper.selectByTopicId(topicId);
            if (answerBookDOList == null) {
                throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
            }
            List<ConversationModelInAnswerBook> conversationModelInAnswerBookList = new ArrayList<>();
            for(AnswerBookDO answerBookDO: answerBookDOList){
                conversationModelInAnswerBookList.add(getConversationModelByAnswerBookDO(answerBookDO));
            }
            return conversationModelInAnswerBookList;
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    /**
     * 在某个topic下，获取对话列表的tag和conversationId的对应关系
     *
     * @param conversationModelInAnswerBooks conversation的列表
     */
    @Override
    public Map<String, List<Integer>> getTagToConversationIds(List<ConversationModelInAnswerBook> conversationModelInAnswerBooks) throws BusinessException {
        Map<String, List<Integer>> map = new HashMap<>();
        for (ConversationModelInAnswerBook conversationModelInAnswerBook : conversationModelInAnswerBooks) {
            Integer conversationId = conversationModelInAnswerBook.getId();
            List<ConversationTagDO> conversationTagDOS = conversationTagDOMapper.listByConversationId(conversationId);
            for (ConversationTagDO conversationTagDO : conversationTagDOS) {
                Integer tagId = conversationTagDO.getTagId();
                String tagName = tagService.getTagNameById(tagId);
                if (map.containsKey(tagName)) {
                    map.get(tagName).add(conversationTagDO.getConversationId());
                } else {
                    List<Integer> list = new ArrayList<>();
                    list.add(conversationTagDO.getConversationId());
                    map.put(tagName, list);
                }
            }
        }
        return map;
    }

    private ConversationModelInAnswerBook getConversationModelByAnswerBookDO(AnswerBookDO answerBookDO) throws BusinessException {
        ConversationDO conversationDO = conversationDOMapper.selectByPrimaryKey(answerBookDO.getConversationId());
        if(conversationDO == null){
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
        ConversationModelInAnswerBook conversationModelInAnswerBook = new ConversationModelInAnswerBook();
        BeanUtils.copyProperties(answerBookDO, conversationModelInAnswerBook);
        BeanUtils.copyProperties(conversationDO, conversationModelInAnswerBook);
        if(answerBookDO.getCollectedAt() != null){
            conversationModelInAnswerBook.setCollectedAt(new DateTime(answerBookDO.getCollectedAt()));
        }
        conversationModelInAnswerBook.setAddresseeUserid(Integer.valueOf(encryptUtils.decrypt(conversationDO.getEncryptAddresseeUserid())));
        conversationModelInAnswerBook.setSenderUserid(Integer.valueOf(encryptUtils.decrypt(conversationDO.getEncryptSenderUserid())));
        FirstLetterDO firstLetterDO = firstLetterDOMapper.selectByPrimaryKey(conversationDO.getFirstLetterId());
        FirstLetterModel firstLetterModel = convertor.firstLetterModelFromFirstLetterDO(firstLetterDO, conversationDO.getId());
        conversationModelInAnswerBook.setLetterModelList(letterService.getRestLettersOfConversation(conversationDO.getId()));
        conversationModelInAnswerBook.getLetterModelList().add(0, firstLetterModel);
        return conversationModelInAnswerBook;
    }
}
