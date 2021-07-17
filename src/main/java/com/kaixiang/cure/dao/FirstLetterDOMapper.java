package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.FirstLetterDO;

import java.util.List;

public interface FirstLetterDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(FirstLetterDO record);

    int insertSelective(FirstLetterDO record);

    FirstLetterDO selectByPrimaryKey(Integer id);

    List<FirstLetterDO> listFirstLetter(String userid);

    int updateByPrimaryKeySelective(FirstLetterDO record);

    int updateByPrimaryKey(FirstLetterDO record);
}