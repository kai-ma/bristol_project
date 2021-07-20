package com.kaixiang.cure.service.model;

import org.hibernate.validator.constraints.Length;
import org.joda.time.DateTime;

import javax.validation.constraints.NotBlank;

/**
 * @description: LetterModel.java: 回信
 * @author: Kaixiang Ma
 * @create: 2021-07-18 00:55
 */
public class LetterModel {
    private Integer id;

    @NotBlank(message = "Content can't be empty")
    @Length(max = 1000, message = "Too much characters for content input")
    @Length(min = 10, message = "Too few characters for content input")
    private String content;

    private Integer senderUserId;

    private Integer addresseeUserId;

    private Integer conversationId;

    private Integer firstLetterId;

    private DateTime createdAt;

    private String pseudonym;

    /**
     * 默认0，回复的首页信；1是回信，2是首封信
     */
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
