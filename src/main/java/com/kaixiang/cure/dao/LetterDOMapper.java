package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.LetterDO;

public interface LetterDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(LetterDO record);

    int insertSelective(LetterDO record);

    LetterDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(LetterDO record);

    int updateByPrimaryKey(LetterDO record);
}