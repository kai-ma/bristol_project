package com.kaixiang.cure.controller.viewobject;

import java.util.Date;
import java.util.List;

/**
 * @description: ConversationVO.java: conversation vo
 * @author: Kaixiang Ma
 * @create: 2021-07-18 17:09
 */
public class ConversationVO {
    private Integer id;

    /**
     * 初期list大小是2，一个firstLetter，一个回复 不支持继续回复
     */
    private List<LetterVO> letterVOList;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<LetterVO> getLetterVOList() {
        return letterVOList;
    }

    public void setLetterVOList(List<LetterVO> letterVOList) {
        this.letterVOList = letterVOList;
    }
}
