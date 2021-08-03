package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.AnswerBookDO;

import java.util.List;

public interface AnswerBookDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(AnswerBookDO record);

    int insertSelective(AnswerBookDO record);

    AnswerBookDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AnswerBookDO record);

    int updateByPrimaryKey(AnswerBookDO record);

    List<AnswerBookDO> selectByTopicId(Integer topicId);

    AnswerBookDO selectByConversationId(Integer conversationId);

    int updateByConversationIdSelective(AnswerBookDO answerBookDO);
}