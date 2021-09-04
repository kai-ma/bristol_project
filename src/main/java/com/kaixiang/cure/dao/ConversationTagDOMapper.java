package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.ConversationDO;
import com.kaixiang.cure.dataobject.ConversationTagDO;

import java.util.List;

public interface ConversationTagDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ConversationTagDO record);

    int insertSelective(ConversationTagDO record);

    ConversationTagDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ConversationTagDO record);

    int updateByPrimaryKey(ConversationTagDO record);

    List<ConversationTagDO> listByConversationId(Integer conversationId);

}