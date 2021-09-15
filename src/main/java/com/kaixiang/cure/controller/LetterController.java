package com.kaixiang.cure.controller;

import com.kaixiang.cure.controller.dataobject.FirstLetterDTO;
import com.kaixiang.cure.controller.dataobject.RecommendDTO;
import com.kaixiang.cure.controller.dataobject.ReplyLetterDTO;
import com.kaixiang.cure.controller.viewobject.FirstLetterVO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.response.CommonReturnType;
import com.kaixiang.cure.service.LetterService;
import com.kaixiang.cure.service.model.FirstLetterModel;
import com.kaixiang.cure.service.model.LetterModel;
import com.kaixiang.cure.service.model.RecommendModel;
import com.kaixiang.cure.utils.Convertor;
import com.kaixiang.cure.utils.annotation.UserLoginToken;
import com.kaixiang.cure.utils.validator.ValidationResult;
import com.kaixiang.cure.utils.validator.ValidatorImpl;
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

    @Autowired
    private Convertor convertor;

    @Autowired
    private ValidatorImpl validator;

    /**
     * 写第一封信
     */
    @RequestMapping(value = "/send/first", method = {RequestMethod.POST})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType sendFirstLetter(@RequestBody FirstLetterDTO firstLetterDTO, HttpServletRequest request) throws BusinessException {
        //校验参数
        ValidationResult result = validator.validate(firstLetterDTO);
        if (result.isHasErrors()) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR, result.getErrMsg());
        }
        //1.构建完整的FirstLetterModel，从token中获取userId
        FirstLetterModel firstLetterModel = convertor.FirstLetterModelFromDTO(firstLetterDTO);
        firstLetterModel.setUserId(getUserIdFromToken(request));
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
        Integer userid = getUserIdFromToken(request);

        //1. 用redis限制刷新时间 todo 解决更新问题，结合前端修改
//        verifyRefreshBar(userid);

        List<FirstLetterModel> firstLetterModelList = letterService.getLettersInHomePage(userid);
        List<FirstLetterVO> firstLetterVOList = firstLetterModelList.stream().map(firstLetterModel -> this.convertFirstLetterVOFromModel(firstLetterModel, false)
        ).collect(Collectors.toList());
        return CommonReturnType.create(firstLetterVOList);
    }


    /**
     * 获取我发出的所有第一封信 todo:分页
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
     * 获取我回复的首封信-用于letterBox replied页面展示  todo:分页
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
     * 首页：回复首页的信
     */
    @RequestMapping(value = "/reply", method = {RequestMethod.POST})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType replyLetter(@RequestBody ReplyLetterDTO replyLetterDTO, HttpServletRequest request) throws BusinessException {
        //校验参数
        ValidationResult result = validator.validate(replyLetterDTO);
        if (result.isHasErrors()) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR, result.getErrMsg());
        }

        LetterModel letterModel = convertor.LetterModelFromDTO(replyLetterDTO);
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
        String conversationId = map.get("conversationId");
        if(conversationId == null || conversationId.length() == 0){
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        List<LetterModel> letterModels = letterService.getReplyLetters(Integer.valueOf(conversationId));
        return CommonReturnType.create(letterModels.stream().map(letterModel -> convertor.letterVOFromLetterModel(letterModel)).collect(Collectors.toList()));
    }

    /**
     * letterBox：根据letterBox中我的某个首封信，获取全部回信-首期不支持继续回复，因此返回就是letterVO的list
     */
    @RequestMapping(value = "/letterbox/replies/firstLetterId", params = {"firstLetterId"}, method = {RequestMethod.GET})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType listRepliesByFirstLetterId(HttpServletRequest request) throws BusinessException {
        Integer firstLetterId = Integer.valueOf(request.getParameter("firstLetterId"));
        List<LetterModel> letterModels = letterService.listRepliesByFirstLetterId(firstLetterId);
        return CommonReturnType.create(letterModels.stream().map(letterModel -> convertor.letterVOFromLetterModel(letterModel)
        ).collect(Collectors.toList()));
    }

    /**
     * 首页：根据firstLetterId，获取我的回信  todo:有点慢，最好也存到redis中
     */
    @RequestMapping(value = "/home/replies/firstLetterId", params = {"firstLetterId"}, method = {RequestMethod.GET})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType listMyRepliesByFirstLetterId(HttpServletRequest request) throws BusinessException {
        Integer userId = (Integer) request.getAttribute(ATTRIBUTE_KEY_USERID);
        Integer firstLetterId = Integer.valueOf(request.getParameter("firstLetterId"));
        List<LetterModel> letterModels = letterService.listMyRepliesByFirstLetterId(userId,firstLetterId);
        return CommonReturnType.create(letterModels.stream().map(letterModel -> convertor.letterVOFromLetterModel(letterModel)
        ).collect(Collectors.toList()));
    }

    /**
     * 推荐
     */
    @RequestMapping(value = "/recommend", method = {RequestMethod.POST})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType report(@RequestBody RecommendDTO recommendDTO, HttpServletRequest request) throws BusinessException {
        //校验参数
        ValidationResult result = validator.validate(recommendDTO);
        if (result.isHasErrors()) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR, result.getErrMsg());
        }
        //1.构建完整的FirstLetterModel，从token中获取userId
        RecommendModel recommendModel = convertor.recommendModelFromReportDTO(recommendDTO);
        recommendModel.setUserid(getUserIdFromToken(request));
        letterService.recommend(recommendModel);
        return CommonReturnType.create("Report successfully!");
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * 刷新的bar，暂时不用
     */
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
        if(firstLetterModel.getCreatedAt() != null){
            firstLetterVO.setCreatedAt(firstLetterModel.getCreatedAt().
                    toString(DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")));
        }
        if (firstLetterModel.getLastRepliedAt() != null) {
            firstLetterVO.setLastRepliedAt(firstLetterModel.getLastRepliedAt().
                    toString(DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")));
        }
        if (!showReplyNumber) {
            firstLetterVO.setReplyNumber(null);
        }
        return firstLetterVO;
    }

    private Integer getUserIdFromToken(HttpServletRequest request){
       return (Integer) request.getAttribute(ATTRIBUTE_KEY_USERID);
    }
}
