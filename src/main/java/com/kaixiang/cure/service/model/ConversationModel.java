package com.kaixiang.cure.service.model;

import java.util.Date;
import java.util.List;

/**
 * @description: ConversationModel.java: 对话的model
 * @author: Kaixiang Ma
 * @create: 2021-07-18 16:48
 */
public class ConversationModel {
    private Integer id;

    private Integer senderUserid;

    private Integer addresseeUserid;

    private Date updatedAt;

    private Integer letterNumber;

    private Integer status;

    private FirstLetterModel firstLetterModel;

    /**初期list大小是1，不支持继续回复*/
    private List<LetterModel> restLetterList;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSenderUserid() {
        return senderUserid;
    }

    public void setSenderUserid(Integer senderUserid) {
        this.senderUserid = senderUserid;
    }

    public Integer getAddresseeUserid() {
        return addresseeUserid;
    }

    public void setAddresseeUserid(Integer addresseeUserid) {
        this.addresseeUserid = addresseeUserid;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getLetterNumber() {
        return letterNumber;
    }

    public void setLetterNumber(Integer letterNumber) {
        this.letterNumber = letterNumber;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public FirstLetterModel getFirstLetterModel() {
        return firstLetterModel;
    }

    public void setFirstLetterModel(FirstLetterModel firstLetterModel) {
        this.firstLetterModel = firstLetterModel;
    }

    public List<LetterModel> getRestLetterList() {
        return restLetterList;
    }

    public void setRestLetterList(List<LetterModel> restLetterList) {
        this.restLetterList = restLetterList;
    }
}
