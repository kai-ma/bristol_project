package com.kaixiang.cure.dataobject;

import java.util.Date;

public class UserDO {
    private Integer id;

    private String pseudonym;

    private String email;

    private Integer stamp;

    private Date lastLoginAt;

    private Integer continuousLoginDays;

    private Integer status;

    private String role;

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
        this.pseudonym = pseudonym == null ? null : pseudonym.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public Integer getStamp() {
        return stamp;
    }

    public void setStamp(Integer stamp) {
        this.stamp = stamp;
    }

    public Date getLastLoginAt() {
        return lastLoginAt;
    }

    public void setLastLoginAt(Date lastLoginAt) {
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role == null ? null : role.trim();
    }
}