package com.kaixiang.cure.service.model;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

/**
 * @description: FirstLetterModel.java: 首封信
 * @author: Kaixiang Ma
 * @create: 2021-07-11 23:04
 */
public class FirstLetterModel {
    private Integer userId;

    @NotBlank(message="title can't be empty")
    private String title;

    @NotBlank(message="content can't be empty")
    @Length(max=1000, message = "too much input content")
    @Length(min=10, message = "too less input content")
    private String content;

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


}
