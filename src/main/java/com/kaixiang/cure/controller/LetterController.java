package com.kaixiang.cure.controller;

import com.kaixiang.cure.controller.viewobject.FirstLetterVO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.response.CommonReturnType;
import com.kaixiang.cure.service.LetterService;
import com.kaixiang.cure.service.model.FirstLetterModel;
import com.kaixiang.cure.utils.annotation.UserLoginToken;
import org.joda.time.format.DateTimeFormat;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

import static com.kaixiang.cure.utils.Constants.ATTRIBUTE_KEY_USERID;


@Controller("letter")
@RequestMapping("/letter")
@CrossOrigin(origins = "http://localhost:3000")
public class LetterController {

    @Autowired
    private LetterService letterService;

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
     * 获取我发出的所有第一封信
     */
    @RequestMapping(value = "/letterbox/first", method = {RequestMethod.GET})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType getFirstLetters(HttpServletRequest request) throws BusinessException {
        //1.构建完整的FirstLetterModel，从token中获取userId
        Integer userid = (Integer) request.getAttribute(ATTRIBUTE_KEY_USERID);
        List<FirstLetterModel> firstLetterModelList = letterService.getFirstLetters(userid);
        List<FirstLetterVO> firstLetterVOList = firstLetterModelList.stream().map(this::convertFirstLetterVOFromModel).collect(Collectors.toList());
        return CommonReturnType.create(firstLetterVOList);
    }

    private FirstLetterVO convertFirstLetterVOFromModel(FirstLetterModel firstLetterModel) {
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
        return firstLetterVO;
    }
}
