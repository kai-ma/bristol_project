package com.kaixiang.cure.controller.dataobject;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @description: FirstLetterDTO.java: 用户在首页写的信
 * @author: Kaixiang Ma
 * @create: 2021-09-05 09:39
 */
public class FirstLetterDTO {
    @NotBlank(message = "Content can't be empty")
    @Length(max = 1500, message = "Too much characters for content input")
    @Length(min = 10, message = "Too few characters for content input")
    private String content;

    @NotBlank(message = "Title can't be empty")
    @Length(max = 100, message = "Too much characters for title input")
    @Length(min = 1, message = "Too few characters for title input")
    private String title;

    @NotNull(message = "Please choose a topic")
    private Integer topicId;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }
}
