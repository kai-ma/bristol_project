package com.kaixiang.cure.controller.viewobject;

/**
 * @description: ConversationVOInAnswerBook.java: 在answerbook中展示的conversation
 * @author: Kaixiang Ma
 * @create: 2021-07-20 15:51
 */
public class ConversationVOInAnswerBook extends ConversationVO{
    private Integer topicId;

    private Integer votes;

    private String collectedAt;

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

    public String getCollectedAt() {
        return collectedAt;
    }

    public void setCollectedAt(String collectedAt) {
        this.collectedAt = collectedAt;
    }

    public boolean isLike() {
        return like;
    }

    public void setLike(boolean like) {
        this.like = like;
    }
}
