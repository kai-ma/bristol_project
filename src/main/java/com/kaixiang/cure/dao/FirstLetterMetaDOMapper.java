package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.FirstLetterMetaDO;

import java.util.List;

public interface FirstLetterMetaDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(FirstLetterMetaDO record);

    int insertSelective(FirstLetterMetaDO record);

    FirstLetterMetaDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(FirstLetterMetaDO record);

    int updateByPrimaryKey(FirstLetterMetaDO record);

    List<FirstLetterMetaDO> listMyFirstLetterMetas(String encryptUserId);

    List<FirstLetterMetaDO> listMetasInHomePage(String encryptUserId);
}