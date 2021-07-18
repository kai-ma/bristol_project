package com.kaixiang.cure.service;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.service.model.FirstLetterModel;
import com.kaixiang.cure.service.model.LetterModel;

import java.util.List;

public interface LetterService {
    /**
     * 写下第一封信
     */
    void sendFirstLetter(FirstLetterModel firstLetterModel) throws BusinessException;

    /**
     * 获取所有我发出的第一封信
     */
    List<FirstLetterModel> getMyFirstLetters(Integer userid) throws BusinessException;


    List<FirstLetterModel> getLettersInHomePage(Integer userid) throws BusinessException;

    void replyFirstLetter(LetterModel letterModel) throws BusinessException;
}
