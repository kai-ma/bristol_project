package com.kaixiang.cure.service.impl;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.service.LetterService;
import com.kaixiang.cure.service.model.FirstLetterModel;
import com.kaixiang.cure.utils.validator.ValidationResult;
import com.kaixiang.cure.utils.validator.ValidatorImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @description: LetterServiceImpl.java: LetterService实现类
 * @author: Kaixiang Ma
 */
@Service
public class LetterServiceImpl implements LetterService {
    @Autowired
    private ValidatorImpl validator;

    @Override
    public FirstLetterModel sendFirstLetter(FirstLetterModel firstLetterModel) throws BusinessException {
        //校验Model
        ValidationResult result = validator.validate(firstLetterModel);
        if (result.isHasErrors()) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR, result.getErrMsg());
        }

        return firstLetterModel;
    }
}
