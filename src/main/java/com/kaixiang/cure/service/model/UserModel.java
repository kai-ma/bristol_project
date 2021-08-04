package com.kaixiang.cure.service.model;

import org.joda.time.DateTime;

import java.util.Date;

public class UserModel {
    private Integer id;

    private String pseudonym;

    private String email;

    private Integer stamp;

    private DateTime lastLoginAt;

    private Integer continuousLoginDays;

    private Integer status;

    private String role;

    private String encryptPassword;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPseudonym() {
        return pseudonym;
    }

    public void setPseudonym(String pseudonym) {
        this.pseudonym = pseudonym;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getStamp() {
        return stamp;
    }

    public void setStamp(Integer stamp) {
        this.stamp = stamp;
    }

    public DateTime getLastLoginAt() {
        return lastLoginAt;
    }

    public void setLastLoginAt(DateTime lastLoginAt) {
        this.lastLoginAt = lastLoginAt;
    }

    public Integer getContinuousLoginDays() {
        return continuousLoginDays;
    }

    public void setContinuousLoginDays(Integer continuousLoginDays) {
        this.continuousLoginDays = continuousLoginDays;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getEncryptPassword() {
        return encryptPassword;
    }

    public void setEncryptPassword(String encryptPassword) {
        this.encryptPassword = encryptPassword;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
