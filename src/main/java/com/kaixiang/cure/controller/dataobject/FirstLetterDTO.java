package com.kaixiang.cure.controller.dataobject;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

/**
 * @description: FirstLetterDTO.java: 用户在首页写的信
 * @author: Kaixiang Ma
 * @create: 2021-09-05 09:39
 */
public class FirstLetterDTO {
    @NotBlank(message = "Content can't be empty")
    @Length(max = 1000, message = "Too much characters for content input")
    @Length(min = 10, message = "Too few characters for content input")
    private String content;

    @NotBlank(message = "Title can't be empty")
    private String title;

    @NotBlank(message = "Please choose a topic")
    private Integer topicId;
}
