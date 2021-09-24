package com.kaixiang.cure.service.model;

import org.joda.time.DateTime;


/**
 * @description: StampBonusModel.java:
 * @author: Kaixiang Ma
 * @create: 2021-09-24 13:55
 */
public class StampBonusModel {
    private Integer id;

    private Integer bonus;

    private Integer reason;

    private String description;

    private String createdAt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBonus() {
        return bonus;
    }

    public void setBonus(Integer bonus) {
        this.bonus = bonus;
    }

    public Integer getReason() {
        return reason;
    }

    public void setReason(Integer reason) {
        this.reason = reason;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
