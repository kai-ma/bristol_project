package com.kaixiang.cure.controller;

import com.kaixiang.cure.controller.viewobject.UserVO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.response.CommonReturnType;
import com.kaixiang.cure.service.UserService;
import com.kaixiang.cure.service.model.UserModel;
import com.kaixiang.cure.utils.JwtTokenUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sun.misc.BASE64Encoder;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import static com.kaixiang.cure.utils.Constants.ROLE_USER;

@Controller("auth")
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController extends BaseController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

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
     * 注册
     */
    @RequestMapping(value = "/register", method = {RequestMethod.POST})
    @ResponseBody
    public CommonReturnType register(@RequestParam(name = "username") String username,
                                     @RequestParam(name = "email") String email,
                                     @RequestParam(name = "password") String password) throws Exception {


        //2.用户的注册流程
        UserModel userModel = new UserModel();
        userModel.setUsername(username);
        userModel.setEmail(email);
        userModel.setEncryptPassword(bCryptPasswordEncoder.encode(password));
        userModel.setRole(ROLE_USER);
        userService.register(userModel);
        return CommonReturnType.create(convertFromModel(userModel));
    }

    /**
     * 3.用户登录接口
     */
    @RequestMapping(value = "/login", method = {RequestMethod.POST})
    @ResponseBody
    public CommonReturnType login(@RequestBody Map<String, String> map) throws Exception {
//        String email = request.getParameter("email");
//        String password = request.getParameter("password");
        //1.入参校验
        String email = map.get("email");
        String password = map.get("password");
        if (StringUtils.isEmpty(email) || StringUtils.isEmpty(password)) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR.setErrorMessage("empty email or empty password"));
        }

        //2.用户登录服务--校验账号密码是否匹配
        UserModel userModel = userService.getUserModelByEmail(email);
        if (userModel == null) {
            throw new BusinessException(EnumBusinessError.USER_NOT_EXIST);
        }
        if (!bCryptPasswordEncoder.matches(password, userModel.getEncryptPassword())) {
            throw new BusinessException(EnumBusinessError.INVALID_PASSWORD);
        }
        Map<String, Object> returnMap = new HashMap<>(1);
        returnMap.put("token", JwtTokenUtils.createToken(userModel.getId(), userModel.getRole(), false));
        return CommonReturnType.create(returnMap);
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
