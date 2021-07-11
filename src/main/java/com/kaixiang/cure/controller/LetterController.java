package com.kaixiang.cure.controller;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.response.CommonReturnType;
import com.kaixiang.cure.service.model.UserModel;
import com.kaixiang.cure.utils.JwtTokenUtils;
import com.kaixiang.cure.utils.annotation.UserLoginToken;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;


@Controller("letter")
@RequestMapping("/letter")
@CrossOrigin(origins = "http://localhost:3000")
public class LetterController {
    /**
     * 写第一封信
     */
    @RequestMapping(value = "/send/first", method = {RequestMethod.POST})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType sendFirstLetter(@RequestBody Map<String, String> map, HttpServletRequest request) throws BusinessException {
        //1.入参校验
        Integer userId = (Integer) request.getAttribute("userid");
        String topic = map.get("topic");
//        if (StringUtils.isEmpty(email) || StringUtils.isEmpty(password)) {
//            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR);
//        }

        //2.用户登录服务--校验账号密码是否匹配

        Map<String, Object> returnMap = new HashMap<>(2);
        return CommonReturnType.create(returnMap);
    }

}
