package com.kaixiang.cure.controller.dataobject;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

/**
 * @description: RecommendDTO.java:
 * @author: Kaixiang Ma
 */
public class RecommendDTO {
    @NotNull(message = "Network error, please refresh and retry")
    private Integer conversationId;

    @Length(max = 255, message = "Too much characters for description")
    private String description;

    public Integer getConversationId() {
        return conversationId;
    }

    public void setConversationId(Integer conversationId) {
        this.conversationId = conversationId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
