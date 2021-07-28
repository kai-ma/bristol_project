package com.kaixiang.cure.controller;

import com.kaixiang.cure.controller.viewobject.FirstLetterVO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.response.CommonReturnType;
import com.kaixiang.cure.service.LetterService;
import com.kaixiang.cure.service.model.ConversationModel;
import com.kaixiang.cure.service.model.FirstLetterModel;
import com.kaixiang.cure.service.model.LetterModel;
import com.kaixiang.cure.utils.annotation.UserLoginToken;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.format.DateTimeFormat;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static com.kaixiang.cure.utils.Constants.ATTRIBUTE_KEY_USERID;


@Controller("api/letter")
@RequestMapping("api/letter")
@CrossOrigin
public class LetterController {

    @Autowired
    private LetterService letterService;

    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * 写第一封信
     */
    @RequestMapping(value = "/send/first", method = {RequestMethod.POST})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType sendFirstLetter(@RequestBody FirstLetterModel firstLetterModel, HttpServletRequest request) throws BusinessException {
        //1.构建完整的FirstLetterModel，从token中获取userId
        firstLetterModel.setUserId((Integer) request.getAttribute(ATTRIBUTE_KEY_USERID));
        letterService.sendFirstLetter(firstLetterModel);
        return CommonReturnType.create("Send successfully!");
    }


    /**
     * 首页获取第一封信
     */
    @RequestMapping(value = "/home/first", method = {RequestMethod.GET})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType getLettersInHomePage(HttpServletRequest request) throws BusinessException {
        //从token中获取userId
        Integer userid = (Integer) request.getAttribute(ATTRIBUTE_KEY_USERID);

        //1. 用redis限制刷新时间 todo 解决更新问题，结合前端修改
//        verifyRefreshBar(userid);

        List<FirstLetterModel> firstLetterModelList = letterService.getLettersInHomePage(userid);
        List<FirstLetterVO> firstLetterVOList = firstLetterModelList.stream().map(firstLetterModel -> this.convertFirstLetterVOFromModel(firstLetterModel, false)
        ).collect(Collectors.toList());
        return CommonReturnType.create(firstLetterVOList);
    }


    /**
     * 获取我发出的所有第一封信
     */
    @RequestMapping(value = "/letterbox/first", method = {RequestMethod.GET})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType getMyFirstLetters(HttpServletRequest request) throws BusinessException {
        //1.构建完整的FirstLetterModel，从token中获取userId
        Integer userid = (Integer) request.getAttribute(ATTRIBUTE_KEY_USERID);
        List<FirstLetterModel> firstLetterModelList = letterService.getMyFirstLetters(userid);
        List<FirstLetterVO> firstLetterVOList = firstLetterModelList.stream().map(firstLetterModel -> this.convertFirstLetterVOFromModel(firstLetterModel, true)
        ).collect(Collectors.toList());
        return CommonReturnType.create(firstLetterVOList);
    }

    /**
     * 获取我回复的首封信-用于letterBox replied页面展示
     */
    @RequestMapping(value = "/letterbox/replied/first", method = {RequestMethod.GET})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType getFirstLetterIReplied(HttpServletRequest request) throws BusinessException {
        //1.构建完整的FirstLetterModel，从token中获取userId
        Integer userid = (Integer) request.getAttribute(ATTRIBUTE_KEY_USERID);
        List<FirstLetterModel> firstLetterModelList = letterService.getFirstLetterListIReplied(userid);
        List<FirstLetterVO> firstLetterVOList = firstLetterModelList.stream().map(firstLetterModel -> this.convertFirstLetterVOFromModel(firstLetterModel, false)
        ).collect(Collectors.toList());
        return CommonReturnType.create(firstLetterVOList);
    }


    /**
     * 首页：回复首页的信 todo: 换成get
     */
    @RequestMapping(value = "/reply", method = {RequestMethod.POST})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType replyLetter(@RequestBody LetterModel letterModel, HttpServletRequest request) throws BusinessException {
        Integer userid = (Integer) request.getAttribute(ATTRIBUTE_KEY_USERID);
        letterModel.setSenderUserId(userid);
        letterService.replyFirstLetter(letterModel);
        return CommonReturnType.create("Reply successfully");
    }

    /**
     * letterBox：根据letterBox中我回复的首封信，获取detail-首期不支持继续回复，因此返回就是我的回复
     */
    @RequestMapping(value = "/letterbox/detail/replied", method = {RequestMethod.POST})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType getLetterBoxDetailReplied(@RequestBody Map<String, String> map) throws BusinessException {
        Integer conversationId = Integer.valueOf(map.get("conversationId"));
        return CommonReturnType.create(letterService.getRestLettersOfConversation(conversationId));
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////

    private void verifyRefreshBar(Integer userid) throws BusinessException {
        String refresh = (String) redisTemplate.opsForValue().get(userid + "_refresh_bar");
        if (StringUtils.isNotBlank(refresh)) {
            throw new BusinessException(EnumBusinessError.REFRESH_LIMIT);
        }
        //重新打上刷新的限制
        redisTemplate.opsForValue().set(userid + "_refresh_bar", "y");
        redisTemplate.expire(userid + "_refresh_bar", 60, TimeUnit.MINUTES);
    }

    /**
     * 对于letterbox的replied，不展示回复个数
     */
    private FirstLetterVO convertFirstLetterVOFromModel(FirstLetterModel firstLetterModel, boolean showReplyNumber) {
        if (firstLetterModel == null) {
            return null;
        }
        FirstLetterVO firstLetterVO = new FirstLetterVO();
        BeanUtils.copyProperties(firstLetterModel, firstLetterVO);
        firstLetterVO.setCreatedAt(firstLetterModel.getCreatedAt().
                toString(DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")));
        if (firstLetterModel.getLastRepliedAt() != null) {
            firstLetterVO.setLastRepliedAt(firstLetterModel.getLastRepliedAt().
                    toString(DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")));
        }
        if (!showReplyNumber) {
            firstLetterVO.setReplyNumber(null);
        }
        return firstLetterVO;
    }

    private FirstLetterVO convertFirstLetterModelFromConversationModel(ConversationModel conversationModel) {
        if (conversationModel == null) {
            return null;
        }
        FirstLetterVO firstLetterVO = new FirstLetterVO();

//        firstLetterVO.setCreatedAt(firstLetterModel.getCreatedAt().
//                toString(DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")));
//        if (firstLetterModel.getLastRepliedAt() != null) {
//            firstLetterVO.setLastRepliedAt(firstLetterModel.getLastRepliedAt().
//                    toString(DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")));
//        }
        return firstLetterVO;
    }
}
