package com.kaixiang.cure.controller.viewobject;

public class UserVO {
    private String pseudonym;

    private Integer stamp;

    private String lastLoginAt;

    private Integer continuousLoginDays;

    private Integer bonusTomorrow;

    private Boolean allowCollect;

    public String getPseudonym() {
        return pseudonym;
    }

    public void setPseudonym(String pseudonym) {
        this.pseudonym = pseudonym;
    }

    public Integer getStamp() {
        return stamp;
    }

    public void setStamp(Integer stamp) {
        this.stamp = stamp;
    }

    public String getLastLoginAt() {
        return lastLoginAt;
    }

    public void setLastLoginAt(String lastLoginAt) {
        this.lastLoginAt = lastLoginAt;
    }

    public Integer getContinuousLoginDays() {
        return continuousLoginDays;
    }

    public void setContinuousLoginDays(Integer continuousLoginDays) {
        this.continuousLoginDays = continuousLoginDays;
    }

    public Boolean getAllowCollect() {
        return allowCollect;
    }

    public void setAllowCollect(Boolean allowCollect) {
        this.allowCollect = allowCollect;
    }

    public Integer getBonusTomorrow() {
        return bonusTomorrow;
    }

    public void setBonusTomorrow(Integer bonusTomorrow) {
        this.bonusTomorrow = bonusTomorrow;
    }
}
