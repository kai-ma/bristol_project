package com.kaixiang.cure.dataobject;

import java.util.Date;

public class ConversationDO {
    private Integer id;

    private String encryptSenderUserid;

    private String encryptAddresseeUserid;

    private Integer firstLetterId;

    private Date updatedAt;

    private Integer status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEncryptSenderUserid() {
        return encryptSenderUserid;
    }

    public void setEncryptSenderUserid(String encryptSenderUserid) {
        this.encryptSenderUserid = encryptSenderUserid == null ? null : encryptSenderUserid.trim();
    }

    public String getEncryptAddresseeUserid() {
        return encryptAddresseeUserid;
    }

    public void setEncryptAddresseeUserid(String encryptAddresseeUserid) {
        this.encryptAddresseeUserid = encryptAddresseeUserid == null ? null : encryptAddresseeUserid.trim();
    }

    public Integer getFirstLetterId() {
        return firstLetterId;
    }

    public void setFirstLetterId(Integer firstLetterId) {
        this.firstLetterId = firstLetterId;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}