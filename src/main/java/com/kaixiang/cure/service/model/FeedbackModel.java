package com.kaixiang.cure.service.model;


/**
 * @description: FeedbackModel.java:
 * @author: Kaixiang Ma
 */
public class FeedbackModel {
    private Integer score1;

    private Integer score2;

    private String feedback;

    private Integer stage;

    private String md5;

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

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public Integer getStage() {
        return stage;
    }

    public void setStage(Integer stage) {
        this.stage = stage;
    }

    public String getMd5() {
        return md5;
    }

    public void setMd5(String md5) {
        this.md5 = md5;
    }

    @Override
    public String toString() {
        return "FeedbackModel{" +
                "score1=" + score1 +
                ", score2=" + score2 +
                ", feedback='" + feedback + '\'' +
                ", stage=" + stage +
                '}';
    }
}
