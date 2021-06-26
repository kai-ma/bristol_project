package com.kaixiang.cure.controller;

import com.kaixiang.cure.controller.viewobject.UserVO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.security.JwtTokenUtil;
import com.kaixiang.cure.service.UserService;
import com.kaixiang.cure.service.impl.UserDetailsServiceImpl;
import com.kaixiang.cure.service.model.UserModel;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sun.misc.BASE64Encoder;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Controller("user")
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController extends BaseController{

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    /**
     * 1.在前端获取UserVO，仅用于检测
     */
    @RequestMapping("/get")
    @ResponseBody
    public UserVO getUser(@RequestParam(name = "id") Integer id) throws BusinessException {
        UserModel userModel = userService.getUserById(id);
        if (userModel == null) {
            throw new BusinessException(EnumBusinessError.USER_NOT_EXIST);
        } else {
            return convertFromModel(userModel);
        }
    }

    /**
     * 2.通过注入的Authentication，获取UserVO，仅用于检测
     */
    @RequestMapping("/getuser")
    @ResponseBody
    public UserVO getUserInfoFromToken(Authentication authentication) throws Exception {
        String username = authentication.getName();
        System.out.println(username);
//        UserModel userModel = userService.getUserById(id);
//        if (userModel != null) {
//            return convertFromModel(userModel);
//        } else {
//            return new UserVO();
//        }
        UserModel userModel = userService.getUserModelByEmail(username);
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
        userModel.setEncryptPassword(new BCryptPasswordEncoder().encode(password));
        userService.register(userModel);
        return convertFromModel(userModel);
    }

    /**
     * 3.用户登录接口
     */
    @RequestMapping(value = "/login", method = {RequestMethod.POST})
    @ResponseBody
    public String login(@RequestParam(name = "email") String email,
                        @RequestParam(name = "password") String password) throws Exception {
        //1.入参校验
        if (StringUtils.isEmpty(email) || StringUtils.isEmpty(password)) {
            throw new Exception("empty email or empty password");
        }

        //2.用户登录服务--校验账号密码是否匹配
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        final UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(email);
        final String token = jwtTokenUtil.generateToken(userDetails);

        //添加 end
        return token;
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
