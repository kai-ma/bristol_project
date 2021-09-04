package com.kaixiang.cure.dataobject;

import java.util.Date;

public class AnswerBookDO {
    private Integer id;

    private Integer conversationId;

    private Integer topicId;

    private Integer votes;

    private Integer collectNums;

    private Date collectedAt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getConversationId() {
        return conversationId;
    }

    public void setConversationId(Integer conversationId) {
        this.conversationId = conversationId;
    }

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

    public Integer getCollectNums() {
        return collectNums;
    }

    public void setCollectNums(Integer collectNums) {
        this.collectNums = collectNums;
    }

    public Date getCollectedAt() {
        return collectedAt;
    }

    public void setCollectedAt(Date collectedAt) {
        this.collectedAt = collectedAt;
    }
}