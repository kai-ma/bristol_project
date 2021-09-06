package com.kaixiang.cure.controller;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.response.CommonReturnType;
import com.kaixiang.cure.service.UserService;
import com.kaixiang.cure.service.model.UserModel;
import com.kaixiang.cure.utils.Convertor;
import com.kaixiang.cure.utils.annotation.UserLoginToken;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

import static com.kaixiang.cure.utils.Constants.ATTRIBUTE_KEY_USERID;

/**
 * @description: UserController.java: 用户相关
 * @author: Kaixiang Ma
 * @create: 2021-08-04 14:45
 */
@Controller("api/user")
@RequestMapping("api/user")
@CrossOrigin
public class UserController extends BaseController {
    @Autowired
    private UserService userService;
    @Autowired
    private Convertor convertor;
    /**
     * 修改用户设置
     */
    @RequestMapping(value = "/settings", method = {RequestMethod.POST})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType register(@RequestBody Map<String, String> map,
                                     HttpServletRequest request) throws BusinessException {
        Integer userId = (Integer) request.getAttribute(ATTRIBUTE_KEY_USERID);
        //todo:给其他所有获取userId的controller方法都加上这个判断 并且返回统一
        if(userId == null){
            throw new BusinessException(EnumBusinessError.TOKEN_ILLEGAL);
        }
        UserModel userModel = new UserModel();
        userModel.setId(userId);
        String pseudonym = map.get("pseudonym");
        if(StringUtils.isNotBlank(pseudonym)){
            userModel.setPseudonym(pseudonym);
        }
        if(map.get("allowCollect") != null){
            Boolean allowCollect = Boolean.valueOf(map.get("allowCollect"));
            userModel.setAllowCollect(allowCollect);
        }
        userService.changeSettings(userModel);
        return CommonReturnType.create("update settings successfully");
    }

    /**
     * 获取用户信息
     */
    @RequestMapping(value = "/info", method = {RequestMethod.GET})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType getUserInfo(HttpServletRequest request) throws BusinessException {
        Integer userId = (Integer) request.getAttribute(ATTRIBUTE_KEY_USERID);
        if(userId == null){
            throw new BusinessException(EnumBusinessError.TOKEN_ILLEGAL);
        }
        UserModel userModel = userService.getUserInfo(userId);
        Map<String, Object> returnMap = new HashMap<>(1);

        if(userModel != null) {
            returnMap.put("userinfo", convertor.userVOFromUserModel(userModel));
        }
        return CommonReturnType.create(returnMap);
    }
}
