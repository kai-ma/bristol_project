package com.kaixiang.cure.controller.dataobject;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @description: ReplyLetterDTO.java: 回信
 * @author: Kaixiang Ma
 * @create: 2021-09-05 09:48
 */
public class ReplyLetterDTO {
    @NotBlank(message = "Content can't be empty")
    @Length(max = 1000, message = "Too much characters for content input")
    @Length(min = 10, message = "Too few characters for content input")
    private String content;

    /**
     * 要回复的首封信的id
     */
    @NotNull(message = "Network error, please refresh and retry")
    private Integer firstLetterId;

    @NotNull(message = "Network error, please refresh and retry")
    private Integer type;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getFirstLetterId() {
        return firstLetterId;
    }

    public void setFirstLetterId(Integer firstLetterId) {
        this.firstLetterId = firstLetterId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
