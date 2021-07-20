package com.kaixiang.cure.service;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.service.model.ConversationModelInAnswerBook;
import com.kaixiang.cure.service.model.TopicModel;

import java.util.List;

public interface AnswerBookService {
    List<TopicModel> listAllTopics() throws BusinessException;

    List<ConversationModelInAnswerBook> listConversationByTopicId(Integer topicId) throws BusinessException;
}
