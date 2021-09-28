package com.kaixiang.cure.dataobject;

import java.util.Date;

public class LetterDO {
    private Integer id;

    private Integer firstLetterId;

    private Integer conversationId;

    private Integer type;

    private String content;

    private Date createdAt;

    private Integer senderStatus;

    private Integer addresseeStatus;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getFirstLetterId() {
        return firstLetterId;
    }

    public void setFirstLetterId(Integer firstLetterId) {
        this.firstLetterId = firstLetterId;
    }

    public Integer getConversationId() {
        return conversationId;
    }

    public void setConversationId(Integer conversationId) {
        this.conversationId = conversationId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getSenderStatus() {
        return senderStatus;
    }

    public void setSenderStatus(Integer senderStatus) {
        this.senderStatus = senderStatus;
    }

    public Integer getAddresseeStatus() {
        return addresseeStatus;
    }

    public void setAddresseeStatus(Integer addresseeStatus) {
        this.addresseeStatus = addresseeStatus;
    }
}