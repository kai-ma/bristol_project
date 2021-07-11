package com.kaixiang.cure.dataobject;

import java.util.Date;

public class FirstLetterDO {
    private Integer id;

    private String
            encryptUserId;

    private String title;

    private String filepath;

    private Integer topicId;

    private Date createdAt;

    private Date lastRepliedAt;

    private Integer status;

    private Integer replyNumber;

    private Integer quality;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEncryptUserId() {
        return encryptUserId;
    }

    public void setEncryptUserId(String encryptUserId) {
        this.encryptUserId = encryptUserId == null ? null : encryptUserId.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath == null ? null : filepath.trim();
    }

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getLastRepliedAt() {
        return lastRepliedAt;
    }

    public void setLastRepliedAt(Date lastRepliedAt) {
        this.lastRepliedAt = lastRepliedAt;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getReplyNumber() {
        return replyNumber;
    }

    public void setReplyNumber(Integer replyNumber) {
        this.replyNumber = replyNumber;
    }

    public Integer getQuality() {
        return quality;
    }

    public void setQuality(Integer quality) {
        this.quality = quality;
    }
}