package com.kaixiang.cure.controller.dataobject;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @description: FeedbackDTO.java:
 * @author: Kaixiang Ma
 */
public class FeedbackDTO {
    @NotNull(message = "Please choose a score to report")
    private Integer score1;

    @NotNull(message = "Please choose a score to report")
    private Integer score2;

    @Length(max = 1000, message = "Too much characters for comment")
    private String comment;

    public Integer getScore1() {
        return score1;
    }

    public void setScore1(Integer score1) {
        this.score1 = score1;
    }

    public Integer getScore2() {
        return score2;
    }

    public void setScore2(Integer score2) {
        this.score2 = score2;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
