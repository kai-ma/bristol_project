package com.kaixiang.cure.service.model;

import org.joda.time.DateTime;

/**
 * @description: LetterModel.java: 回信
 * @author: Kaixiang Ma
 * @create: 2021-07-18 00:55
 */
public class LetterModel {
    private Integer id;

    private String content;

    private Integer senderUserId;

    private Integer addresseeUserId;

    private Integer conversationId;

    private Integer firstLetterId;

    private DateTime createdAt;

    private String pseudonym;

    private Integer type;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getSenderUserId() {
        return senderUserId;
    }

    public void setSenderUserId(Integer senderUserId) {
        this.senderUserId = senderUserId;
    }

    public Integer getAddresseeUserId() {
        return addresseeUserId;
    }

    public void setAddresseeUserId(Integer addresseeUserId) {
        this.addresseeUserId = addresseeUserId;
    }

    public Integer getConversationId() {
        return conversationId;
    }

    public void setConversationId(Integer conversationId) {
        this.conversationId = conversationId;
    }

    public Integer getFirstLetterId() {
        return firstLetterId;
    }

    public void setFirstLetterId(Integer firstLetterId) {
        this.firstLetterId = firstLetterId;
    }

    public DateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(DateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getPseudonym() {
        return pseudonym;
    }

    public void setPseudonym(String pseudonym) {
        this.pseudonym = pseudonym;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}