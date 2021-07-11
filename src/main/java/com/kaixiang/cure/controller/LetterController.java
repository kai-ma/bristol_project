package com.kaixiang.cure.controller;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.response.CommonReturnType;
import com.kaixiang.cure.service.LetterService;
import com.kaixiang.cure.service.model.FirstLetterModel;
import com.kaixiang.cure.utils.annotation.UserLoginToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;


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
    public CommonReturnType sendFirstLetter(@RequestBody Map<String, String> map, HttpServletRequest request) throws BusinessException {
        //1.获取入参
        Integer userId = (Integer) request.getAttribute("userid");
        String topic = map.get("topic");

        FirstLetterModel firstLetterModel = new FirstLetterModel();
        firstLetterModel.setContent(map.get("content"));
        firstLetterModel.setTitle(map.get("topic"));

        FirstLetterModel letterModel = letterService.sendFirstLetter(firstLetterModel);
        return CommonReturnType.create(letterModel);
    }

}
