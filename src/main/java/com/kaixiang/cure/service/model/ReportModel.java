package com.kaixiang.cure.service.model;

/**
 * @description: ReportModel.java:
 * @author: Kaixiang Ma
 * @create: 2021-09-07 21:09
 */
public class ReportModel {
    private Integer userid;

    private Integer letterId;

    private String reason;

    private String description;

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Integer getLetterId() {
        return letterId;
    }

    public void setLetterId(Integer letterId) {
        this.letterId = letterId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
