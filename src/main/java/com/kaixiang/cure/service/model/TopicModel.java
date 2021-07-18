package com.kaixiang.cure.service.model;

/**
 * @description: TopicModel.java: topic model，用于answerbook
 * @author: Kaixiang Ma
 * @create: 2021-07-19 00:59
 */
public class TopicModel {
    private Integer id;

    private String name;

    private String description;

    private String imgURL;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImgURL() {
        return imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }
}
