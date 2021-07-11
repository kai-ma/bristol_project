package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.FirstLetterDO;

public interface FirstLetterDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(FirstLetterDO record);

    int insertSelective(FirstLetterDO record);

    FirstLetterDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(FirstLetterDO record);

    int updateByPrimaryKey(FirstLetterDO record);
}