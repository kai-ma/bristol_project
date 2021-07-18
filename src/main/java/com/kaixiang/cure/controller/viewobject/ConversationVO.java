package com.kaixiang.cure.controller.viewobject;

import com.kaixiang.cure.service.model.FirstLetterModel;
import com.kaixiang.cure.service.model.LetterModel;

import java.util.Date;
import java.util.List;

/**
 * @description: ConversationVO.java: conversation vo
 * @author: Kaixiang Ma
 * @create: 2021-07-18 17:09
 */
public class ConversationVO {
    private Integer id;

    private Integer senderUserid;

    private String addresseeUserid;

    private Date updatedAt;

    private Integer letterNumber;

    private Integer status;

    private FirstLetterModel firstLetterModel;

    /**初期list大小是1，不支持继续回复*/
    private List<LetterModel> restLetterList;
}
