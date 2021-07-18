package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.ConversationDO;

public interface ConversationDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ConversationDO record);

    int insertSelective(ConversationDO record);

    ConversationDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ConversationDO record);

    int updateByPrimaryKey(ConversationDO record);
}