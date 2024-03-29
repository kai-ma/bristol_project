package com.kaixiang.cure.service.model;

import org.joda.time.DateTime;

import javax.validation.constraints.NotBlank;

/**
 * @description: FirstLetterModel.java: 首封信
 * @author: Kaixiang Ma
 * @create: 2021-07-11 23:04
 */
public class FirstLetterModel extends LetterModel{
    private Integer userId;

    private String title;

    private DateTime lastRepliedAt;

    private Integer replyNumber;

    private Integer topicId;

    private Integer unread;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public DateTime getLastRepliedAt() {
        return lastRepliedAt;
    }

    public void setLastRepliedAt(DateTime lastRepliedAt) {
        this.lastRepliedAt = lastRepliedAt;
    }

    public Integer getReplyNumber() {
        return replyNumber;
    }

    public void setReplyNumber(Integer replyNumber) {
        this.replyNumber = replyNumber;
    }

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }

    public Integer getUnread() {
        return unread;
    }

    public void setUnread(Integer unread) {
        this.unread = unread;
    }
}
