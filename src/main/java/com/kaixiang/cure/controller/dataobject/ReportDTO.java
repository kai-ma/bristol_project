package com.kaixiang.cure.controller.dataobject;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * @description: ReportDTO.java: 前端用户举报的传参
 * @author: Kaixiang Ma
 * @create: 2021-09-07 20:59
 */
public class ReportDTO {
    @NotNull(message = "Please choose a letter to report")
    private Integer letterId;

    @NotBlank(message = "Please choose reason tags")
    @Length(max = 255, message = "Too much reason tags")
    @Length(min = 3, message = "Too few reason tags")
    private String reason;

    @Length(max = 255, message = "Too much characters for description")
    private String description;

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
