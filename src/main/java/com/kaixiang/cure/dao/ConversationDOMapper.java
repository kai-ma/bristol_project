package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.ConversationDO;

import java.util.List;

public interface ConversationDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ConversationDO record);

    int insertSelective(ConversationDO record);

    ConversationDO selectByPrimaryKey(Integer id);

    List<ConversationDO> listConversationsIReplied(String encryptAddresseeUserid);

    ConversationDO selectBy(Integer id);

    int updateByPrimaryKeySelective(ConversationDO record);

    int updateByPrimaryKey(ConversationDO record);
}