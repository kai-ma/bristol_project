package com.kaixiang.cure.service;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.service.model.ConversationModelInAnswerBook;
import com.kaixiang.cure.service.model.TopicModel;

import java.util.List;
import java.util.Map;

public interface AnswerBookService {
    List<TopicModel> listAllTopics() throws BusinessException;

    List<ConversationModelInAnswerBook> listConversationByTopicId(Integer topicId, Integer userId) throws BusinessException;

    /**
     * 在某个topic下，获取对话列表的tag和conversationId的对应关系
     */
    Map<String, List<Integer>> getTagToConversationIds(List<ConversationModelInAnswerBook> conversationModelInAnswerBooks) throws BusinessException;

    /**
     * 查询用户是否点赞过answerbook中这个对话 todo:把点赞放到redis中
     */
    boolean checkIfLikedByUser(Integer userId, Integer conversationId);

    /**
     * 点赞answerbook中的对话 todo:把点赞放到redis中
     */
    public void likeOperation(Integer userId, Integer conversationId);

    /**
     * 取消点赞answerbook中的对话 todo:把点赞放到redis中
     */
    public void cancelLikeOperation(Integer userId, Integer conversationId);
}
