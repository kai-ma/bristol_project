package com.kaixiang.cure.service;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.service.model.ConversationModelInAnswerBook;
import com.kaixiang.cure.service.model.TopicModel;

import java.util.List;
import java.util.Map;

public interface AnswerBookService {
    List<TopicModel> listAllTopics() throws BusinessException;

    List<ConversationModelInAnswerBook> listConversationByTopicId(Integer topicId) throws BusinessException;

    /**
     * 在某个topic下，获取对话列表的tag和conversationId的对应关系
     */
    Map<String, List<Integer>> getTagToConversationIds(List<ConversationModelInAnswerBook> conversationModelInAnswerBooks) throws BusinessException;
}
