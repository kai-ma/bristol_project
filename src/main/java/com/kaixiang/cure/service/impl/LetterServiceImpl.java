package com.kaixiang.cure.service.impl;

import com.kaixiang.cure.dao.FirstLetterDOMapper;
import com.kaixiang.cure.dataobject.FirstLetterDO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.service.LetterService;
import com.kaixiang.cure.service.model.FirstLetterModel;
import com.kaixiang.cure.utils.validator.ValidationResult;
import com.kaixiang.cure.utils.validator.ValidatorImpl;
import org.joda.time.DateTime;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @description: LetterServiceImpl.java: LetterService实现类
 * @author: Kaixiang Ma
 */
@Service
public class LetterServiceImpl implements LetterService {
    @Autowired
    private ValidatorImpl validator;
    @Autowired
    private FirstLetterDOMapper firstLetterDOMapper;

    @Override
    public void sendFirstLetter(FirstLetterModel firstLetterModel) throws BusinessException {
        //校验Model
        ValidationResult result = validator.validate(firstLetterModel);
        if (result.isHasErrors()) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR, result.getErrMsg());
        }
        FirstLetterDO firstLetterDO = convertDataObjectFromModel(firstLetterModel);
        try {
            firstLetterDOMapper.insertSelective(firstLetterDO);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    /**
     * 获取所有我发出的第一封信
     */
    @Override
    public List<FirstLetterModel> getFirstLetters(Integer userid) throws BusinessException {
        if (userid == null) {
            return null;
        }
        try {
            List<FirstLetterDO> firstLetterDOList = firstLetterDOMapper.listFirstLetter(getEncryptUserid(userid));
            List<FirstLetterModel> firstLetterModelList = new ArrayList<>();
            for (FirstLetterDO firstLetterDO : firstLetterDOList) {
                FirstLetterModel firstLetterModel = convertModelFromDataObject(firstLetterDO);
                if (firstLetterModel != null) {
                    firstLetterModelList.add(firstLetterModel);
                }
            }
            return firstLetterModelList;
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * 在这里完成转换  todo：存到文件
     */
    private FirstLetterDO convertDataObjectFromModel(FirstLetterModel firstLetterModel) {
        if (firstLetterModel == null) {
            return null;
        }
        FirstLetterDO firstLetterDO = new FirstLetterDO();
        BeanUtils.copyProperties(firstLetterModel, firstLetterDO);
        firstLetterDO.setUserid(getEncryptUserid(firstLetterModel.getUserId()));
        firstLetterDO.setFilepath(firstLetterModel.getContent());
        return firstLetterDO;
    }


    private FirstLetterModel convertModelFromDataObject(FirstLetterDO firstLetterDO) {
        if (firstLetterDO == null) {
            return null;
        }
        FirstLetterModel firstLetterModel = new FirstLetterModel();
        BeanUtils.copyProperties(firstLetterDO, firstLetterModel);
        firstLetterModel.setCreatedAt(new DateTime(firstLetterDO.getCreatedAt()));
        if (firstLetterDO.getReplyNumber() != null && firstLetterDO.getReplyNumber() != 0) {
            firstLetterModel.setLastRepliedAt(new DateTime(firstLetterDO.getLastRepliedAt()));
        }
        firstLetterModel.setContent(getContent(firstLetterDO.getFilepath()));
        return firstLetterModel;
    }


    /**
     * todo: 加密
     */
    private String getEncryptUserid(Integer userid) {
        return String.valueOf(userid);
    }

    /**
     * todo: 从文件中获取内容
     */
    private String getContent(String filePath) {
        return filePath;
    }
}
