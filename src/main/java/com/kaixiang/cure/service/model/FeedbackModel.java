package com.kaixiang.cure.service.model;



/**
 * @description: FeedbackModel.java:
 * @author: Kaixiang Ma
 */
public class FeedbackModel {
    private Integer userid;

    private Integer score1;

    private Integer score2;

    private String comment;

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

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
