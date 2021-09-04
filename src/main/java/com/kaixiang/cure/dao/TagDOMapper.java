package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.TagDO;

public interface TagDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TagDO record);

    int insertSelective(TagDO record);

    TagDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TagDO record);

    int updateByPrimaryKey(TagDO record);
}