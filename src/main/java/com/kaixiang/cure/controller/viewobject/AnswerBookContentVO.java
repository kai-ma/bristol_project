package com.kaixiang.cure.controller.viewobject;

import com.kaixiang.cure.service.model.ConversationModel;

import java.util.List;

/**
 * @description: AnswerBookContentVO.java: answerbook点击一个topic，获取到的内容
 * @author: Kaixiang Ma
 * @create: 2021-07-20 00:45
 */
public class AnswerBookContentVO {
    private List<ConversationModel> conversationModelList;

    private Integer TopicId;

    public List<ConversationModel> getConversationModelList() {
        return conversationModelList;
    }

    public void setConversationModelList(List<ConversationModel> conversationModelList) {
        this.conversationModelList = conversationModelList;
    }

    public Integer getTopicId() {
        return TopicId;
    }

    public void setTopicId(Integer topicId) {
        TopicId = topicId;
    }
}
