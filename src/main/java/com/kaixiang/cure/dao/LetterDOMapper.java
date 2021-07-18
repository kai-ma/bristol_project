package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.LetterDO;

import java.util.List;

public interface LetterDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(LetterDO record);

    int insertSelective(LetterDO record);

    LetterDO selectByPrimaryKey(Integer id);

    List<LetterDO> listLettersByConversationId(Integer conversationId);

    int updateByPrimaryKeySelective(LetterDO record);

    int updateByPrimaryKey(LetterDO record);
}