package com.kaixiang.cure.service;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.service.model.ConversationModel;
import com.kaixiang.cure.service.model.FirstLetterModel;
import com.kaixiang.cure.service.model.LetterModel;

import java.util.List;

public interface LetterService {
    /**
     * 写下第一封信
     */
    void sendFirstLetter(FirstLetterModel firstLetterModel) throws BusinessException;

    List<FirstLetterModel> getLettersInHomePage(Integer userid) throws BusinessException;

    /**
     * 获取所有我发出的第一封信
     */
    List<FirstLetterModel> getMyFirstLetters(Integer userid) throws BusinessException;

    /**
     * 获取我回复的所有首封信
     */
    List<FirstLetterModel> getFirstLetterListIReplied(Integer userid) throws BusinessException;

    /**
     * letterBox：根据letterBox中我回复的首封信，获取detail-首期不支持继续回复，因此返回就是我的回复
     */
    List<LetterModel> getReplyLetters(Integer conversationId) throws BusinessException;

    void replyFirstLetter(LetterModel letterModel) throws BusinessException;

    /**
     * letterBox：根据letterBox中我发出的首封信，获取所有回复的信
     */
    List<LetterModel> listRepliesByFirstLetterId(Integer firstLetterId) throws BusinessException;

    /**
     * 获取回复：用于首页 点击某个信 显示信和信的回复
     */
    List<LetterModel> listMyRepliesByFirstLetterId(Integer userId, Integer firstLetterId) throws BusinessException;
}
