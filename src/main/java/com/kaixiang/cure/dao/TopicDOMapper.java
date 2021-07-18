package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.TopicDO;

import java.util.List;

public interface TopicDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TopicDO record);

    int insertSelective(TopicDO record);

    TopicDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TopicDO record);

    int updateByPrimaryKey(TopicDO record);

    List<TopicDO> listAllTopics();
}