package com.kaixiang.cure.controller;

import com.kaixiang.cure.controller.viewobject.AnswerBookContentVO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.response.CommonReturnType;
import com.kaixiang.cure.service.AnswerBookService;
import com.kaixiang.cure.service.model.ConversationModel;
import com.kaixiang.cure.service.model.TopicModel;
import com.kaixiang.cure.utils.Convertor;
import com.kaixiang.cure.utils.annotation.UserLoginToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;


/**
 * @description: AnswerBookController.java: answerbook相关的controller
 * @author: Kaixiang Ma
 * @create: 2021-07-19 00:51
 */
@Controller("answerbook")
@RequestMapping("/answerbook")
@CrossOrigin(origins = "http://localhost:3000")
public class AnswerBookController {
    @Autowired
    private AnswerBookService answerBookService;
    @Autowired
    private Convertor convertor;

    /**
     * 获取AnswerBook的topic
     */
    @RequestMapping(value = "/get/topic", method = {RequestMethod.GET})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType listAllTopics() throws BusinessException {
        List<TopicModel> topicModelList = answerBookService.listAllTopics();
        return CommonReturnType.create(topicModelList.stream().map(topicModel -> convertor.topicVOFromTopicModel(topicModel)
        ).collect(Collectors.toList()));
    }

    /**
     * 根据topicId，获取conversations。AnswerBook页面，点击宫格，显示Conversations.
     */
    @RequestMapping(value = "/get/conversations/topic", params = {"topicId"}, method = {RequestMethod.GET})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType listConversationByTopicId(HttpServletRequest request) throws BusinessException {
        Integer topicId = Integer.valueOf(request.getParameter("topicId"));
        List<ConversationModel> conversationModelList = answerBookService.listConversationByTopicId(topicId);
        AnswerBookContentVO answerBookContentVO = new AnswerBookContentVO();
        answerBookContentVO.setTopicId(topicId);
        answerBookContentVO.setConversationModelList(conversationModelList);
        return CommonReturnType.create(answerBookContentVO);
    }
}
