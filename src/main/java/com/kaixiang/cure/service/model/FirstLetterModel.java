package com.kaixiang.cure.service.model;

import org.hibernate.validator.constraints.Length;
import org.joda.time.DateTime;

import javax.validation.constraints.NotBlank;

/**
 * @description: FirstLetterModel.java: 首封信
 * @author: Kaixiang Ma
 * @create: 2021-07-11 23:04
 */
public class FirstLetterModel {
    private Integer id;

    private Integer userId;

    @NotBlank(message = "Title can't be empty")
    private String title;

    @NotBlank(message = "Content can't be empty")
    @Length(max = 1000, message = "Too much characters for content input")
    @Length(min = 10, message = "Too few characters for content input")
    private String content;

    private DateTime createdAt;

    private DateTime lastRepliedAt;

    private Integer replyNumber;

    private String pseudonym;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public DateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(DateTime createdAt) {
        this.createdAt = createdAt;
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

    public String getPseudonym() {
        return pseudonym;
    }

    public void setPseudonym(String pseudonym) {
        this.pseudonym = pseudonym;
    }
}
