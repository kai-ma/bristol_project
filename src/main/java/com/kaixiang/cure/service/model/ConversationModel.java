package com.kaixiang.cure.service.model;

import org.joda.time.DateTime;

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

    private DateTime updatedAt;

    private Integer status;

    /**初期list大小是2，只有第一封信和回信，不支持继续回复*/
    private List<LetterModel> letterModelList;

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

    public DateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(DateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<LetterModel> getLetterModelList() {
        return letterModelList;
    }

    public void setLetterModelList(List<LetterModel> letterModelList) {
        this.letterModelList = letterModelList;
    }
}
