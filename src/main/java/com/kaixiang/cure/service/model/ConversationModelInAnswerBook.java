package com.kaixiang.cure.service.model;

import org.joda.time.DateTime;

/**
 * @description: ConversationModelInAnswerBook.java: 在answerbook中展示的conversationModel，包含了一些展示相关的信息
 * @author: Kaixiang Ma
 * @create: 2021-07-20 15:59
 */
public class ConversationModelInAnswerBook extends ConversationModel {
    private Integer topicId;

    private Integer votes;

    private DateTime collectedAt;

    /**
     * 该用户是否点赞
     */
    private boolean like;

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }

    public Integer getVotes() {
        return votes;
    }

    public void setVotes(Integer votes) {
        this.votes = votes;
    }

    public DateTime getCollectedAt() {
        return collectedAt;
    }

    public void setCollectedAt(DateTime collectedAt) {
        this.collectedAt = collectedAt;
    }

    public boolean isLike() {
        return like;
    }

    public void setLike(boolean like) {
        this.like = like;
    }
}
