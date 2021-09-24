package com.kaixiang.cure.controller.viewobject;

/**
 * @description: FirstLetterVO.java: 第一封信的VO
 * @author: Kaixiang Ma
 * @create: 2021-07-17 16:47
 */
public class FirstLetterVO extends LetterVO {

    private String title;

    private String lastRepliedAt;

    private Integer replyNumber;

    private Integer unread;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLastRepliedAt() {
        return lastRepliedAt;
    }

    public void setLastRepliedAt(String lastRepliedAt) {
        this.lastRepliedAt = lastRepliedAt;
    }

    public Integer getReplyNumber() {
        return replyNumber;
    }

    public void setReplyNumber(Integer replyNumber) {
        this.replyNumber = replyNumber;
    }

    public Integer getUnread() {
        return unread;
    }

    public void setUnread(Integer unread) {
        this.unread = unread;
    }
}
