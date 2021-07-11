package com.kaixiang.cure.service;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.service.model.FirstLetterModel;

public interface LetterService {
    FirstLetterModel sendFirstLetter(FirstLetterModel firstLetterModel) throws BusinessException;
}
