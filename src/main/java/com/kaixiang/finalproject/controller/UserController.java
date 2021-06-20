package com.kaixiang.finalproject.controller;

import com.kaixiang.finalproject.controller.viewobject.UserVO;
import com.kaixiang.finalproject.service.UserService;
import com.kaixiang.finalproject.service.model.UserModel;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import sun.misc.BASE64Encoder;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Controller("user")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 1.在前端获取UserVO，用于检测
     */
    @RequestMapping("/get")
    @ResponseBody
    public UserVO getUser(@RequestParam(name = "id") Integer id) {
        UserModel userModel = userService.getUserById(id);
        if (userModel != null) {
            return convertFromModel(userModel);
        } else {
            return new UserVO();
        }
    }


    /**
     *
     */
    @RequestMapping(value = "/register", method = {RequestMethod.POST})
    @ResponseBody
    public UserVO register(@RequestParam(name = "username") String username,
                           @RequestParam(name = "email") String email,
                           @RequestParam(name = "password") String password) throws Exception {


        //2.用户的注册流程
        UserModel userModel = new UserModel();
        userModel.setUsername(username);
        userModel.setEmail(email);
        userModel.setEncryptPassword(this.encodeByMD5(password));
        userService.register(userModel);
        return convertFromModel(userModel);
    }

    /**
     * 3.用户登录接口
     */
    @RequestMapping(value = "/login", method = {RequestMethod.POST})
    @ResponseBody
    public UserVO login(@RequestParam(name = "email") String email,
                        @RequestParam(name = "password") String password) throws Exception {
        //1.入参校验
        if (StringUtils.isEmpty(email) || StringUtils.isEmpty(password)) {
            throw new Exception("empty email or empty password");
        }

        //2.用户登录服务--校验账号密码是否匹配
        UserModel userModel = userService.validateLogin(email, this.encodeByMD5(password));

        return convertFromModel(userModel);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////

    private String encodeByMD5(String str) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        //确定计算方法
        MessageDigest md5 = MessageDigest.getInstance("MD5");
        BASE64Encoder base64Encoder = new BASE64Encoder();
        //加密字符串
        String newstr = base64Encoder.encode(md5.digest(str.getBytes("utf-8")));
        return newstr;
    }

    private UserVO convertFromModel(UserModel userModle) {
        if (userModle == null) {
            return null;
        }
        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(userModle, userVO);

        return userVO;
    }
}
