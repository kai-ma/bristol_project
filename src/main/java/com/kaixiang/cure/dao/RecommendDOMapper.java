package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.RecommendDO;

public interface RecommendDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(RecommendDO record);

    int insertSelective(RecommendDO record);

    RecommendDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RecommendDO record);

    int updateByPrimaryKey(RecommendDO record);
}