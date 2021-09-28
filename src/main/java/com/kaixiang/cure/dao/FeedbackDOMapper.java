package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.FeedbackDO;

public interface FeedbackDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(FeedbackDO record);

    int insertSelective(FeedbackDO record);

    FeedbackDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(FeedbackDO record);

    int updateByPrimaryKey(FeedbackDO record);
}