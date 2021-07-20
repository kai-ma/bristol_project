package com.kaixiang.cure.controller.viewobject;

/**
 * @description: LetterVO.java: 用于answerbook中conversation的展示
 * @author: Kaixiang Ma
 * @create: 2021-07-20 15:13
 */
public class LetterVO {
    private Integer id;

    private String content;

    private String createdAt;

    private String pseudonym;

    private Integer conversationId;

    /**
     * type为0，是first letter
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

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getPseudonym() {
        return pseudonym;
    }

    public void setPseudonym(String pseudonym) {
        this.pseudonym = pseudonym;
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
}
