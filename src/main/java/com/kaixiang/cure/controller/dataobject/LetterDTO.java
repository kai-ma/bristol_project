package com.kaixiang.cure.controller.dataobject;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

/**
 * @description: LetterDTO.java: 回信
 * @author: Kaixiang Ma
 * @create: 2021-09-05 09:48
 */
public class LetterDTO {
    @NotBlank(message = "Content can't be empty")
    @Length(max = 1000, message = "Too much characters for content input")
    @Length(min = 10, message = "Too few characters for content input")
    private String content;

    @NotBlank(message = "Network error, please refresh and retry")
    private Integer firstLetterId;

    @NotBlank(message = "Network error, please refresh and retry")
    private Integer type;
}
