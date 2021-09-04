package com.kaixiang.cure.controller;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.response.CommonReturnType;
import com.kaixiang.cure.service.AnswerBookService;
import com.kaixiang.cure.service.model.ConversationModelInAnswerBook;
import com.kaixiang.cure.service.model.LetterModel;
import com.kaixiang.cure.service.model.TopicModel;
import com.kaixiang.cure.utils.Convertor;
import com.kaixiang.cure.utils.annotation.UserLoginToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.kaixiang.cure.utils.Constants.ATTRIBUTE_KEY_USERID;


/**
 * @description: AnswerBookController.java: answerbook相关的controller
 * @author: Kaixiang Ma
 * @create: 2021-07-19 00:51
 */
@Controller("api/answerbook")
@RequestMapping("api/answerbook")
@CrossOrigin
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
        Integer userid = (Integer) request.getAttribute(ATTRIBUTE_KEY_USERID);
        List<ConversationModelInAnswerBook> conversationModelInAnswerBookList = answerBookService.listConversationByTopicId(topicId, userid);
        Map<String, Object> returnMap = new HashMap<>(2);
        Map<String, List<Integer>> tagToConversationIds = answerBookService.getTagToConversationIds(conversationModelInAnswerBookList);
        returnMap.put("tagToConversationIds", tagToConversationIds);
        returnMap.put("conversations", conversationModelInAnswerBookList.stream().map(conversationModelInAnswerBook -> convertor.conversationVOInAnswerBookFromConversationModelInAnswerBook(conversationModelInAnswerBook)
        ).collect(Collectors.toList()));
        return CommonReturnType.create(returnMap);
    }

    /**
     * 点赞
     */
    @RequestMapping(value = "/like", method = {RequestMethod.POST})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType likeOperation(@RequestBody Map<String, String> map, HttpServletRequest request) throws BusinessException {
        Integer conversationId = Integer.valueOf(map.get("conversationId"));
        Integer userId = (Integer) request.getAttribute(ATTRIBUTE_KEY_USERID);
        answerBookService.likeOperation(userId,conversationId);
        return CommonReturnType.create("like successful");
    }

    /**
     * 取消点赞
     */
    @RequestMapping(value = "/cancel_like", method = {RequestMethod.POST})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType cancelLikeOperation(@RequestBody Map<String, String> map, HttpServletRequest request) throws BusinessException {
        Integer conversationId = Integer.valueOf(map.get("conversationId"));
        Integer userId = (Integer) request.getAttribute(ATTRIBUTE_KEY_USERID);
        answerBookService.cancelLikeOperation(userId,conversationId);
        return CommonReturnType.create("cancel like successful");
    }
}
