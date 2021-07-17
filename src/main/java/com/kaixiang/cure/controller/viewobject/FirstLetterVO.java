package com.kaixiang.cure.controller.viewobject;

/**
 * @description: FirstLetterVO.java: 第一封信的VO
 * @author: Kaixiang Ma
 * @create: 2021-07-17 16:47
 */
public class FirstLetterVO {
    private Integer id;

    private String title;

    private String content;

    private String createdAt;

    private String lastRepliedAt;

    private Integer replyNumber;

    private String pseudonym;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getLastRepliedAt() {
        return lastRepliedAt;
    }

    public void setLastRepliedAt(String lastRepliedAt) {
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
