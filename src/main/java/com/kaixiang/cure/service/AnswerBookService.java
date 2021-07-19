package com.kaixiang.cure.service;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.service.model.ConversationModel;
import com.kaixiang.cure.service.model.TopicModel;

import java.util.List;

public interface AnswerBookService {
    List<TopicModel> listAllTopics() throws BusinessException;

    List<ConversationModel> listConversationByTopicId(Integer topicId) throws BusinessException;
}
