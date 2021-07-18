package com.kaixiang.cure.service.impl;

import com.kaixiang.cure.dao.TopicDOMapper;
import com.kaixiang.cure.dataobject.TopicDO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.service.AnswerBookService;
import com.kaixiang.cure.service.model.TopicModel;
import com.kaixiang.cure.utils.Convertor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @description: AnswerBookServiceImpl.java: AnswerBookService实现类
 * @author: Kaixiang Ma
 * @create: 2021-07-19 01:01
 */
@Service
public class AnswerBookServiceImpl implements AnswerBookService {
    @Autowired
    private TopicDOMapper topicDOMapper;
    @Autowired
    private Convertor convertor;

    @Override
    public List<TopicModel> listAllTopics() throws BusinessException {
        try {
            List<TopicDO> topicDOList = topicDOMapper.listAllTopics();
            return topicDOList.stream().map(topicDO -> convertor.topicModelFromTopicDO(topicDO)
            ).collect(Collectors.toList());
        } catch (Exception e) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }
}
