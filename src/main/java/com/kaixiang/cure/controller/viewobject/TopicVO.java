package com.kaixiang.cure.controller.viewobject;

/**
 * @description: TopicVO.java: topic vo，用于answerbook页面展示
 * @author: Kaixiang Ma
 * @create: 2021-07-19 01:30
 */
public class TopicVO {

    private Integer id;

    private String text;

    private String description;

    private String icon;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
