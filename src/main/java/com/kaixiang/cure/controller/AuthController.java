package com.kaixiang.cure.controller;

import com.kaixiang.cure.controller.dataobject.LoginDTO;
import com.kaixiang.cure.controller.dataobject.RegisterDTO;
import com.kaixiang.cure.controller.viewobject.UserVO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.response.CommonReturnType;
import com.kaixiang.cure.service.UserService;
import com.kaixiang.cure.service.model.UserModel;
import com.kaixiang.cure.utils.Convertor;
import com.kaixiang.cure.utils.JwtTokenUtils;
import com.kaixiang.cure.utils.validator.ValidationResult;
import com.kaixiang.cure.utils.validator.ValidatorImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller("api/auth")
@RequestMapping("api/auth")
@CrossOrigin
public class AuthController extends BaseController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private Convertor convertor;

    @Autowired
    private ValidatorImpl validator;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 注册
     */
    @RequestMapping(value = "/register", method = {RequestMethod.POST})
    @ResponseBody
    public CommonReturnType register(@RequestBody RegisterDTO registerDTO) throws Exception {
        //校验注册参数
        ValidationResult result = validator.validate(registerDTO);
        if (result.isHasErrors()) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR, result.getErrMsg());
        }
        registerDTO.setPassword(bCryptPasswordEncoder.encode(registerDTO.getPassword()));
        UserModel userModel = convertor.userModelFromRegisterDTO(registerDTO);
        userService.register(userModel);
        return CommonReturnType.create(convertor.userVOFromUserModel(userModel));
    }

    /**
     * 用户登录接口
     */
    @RequestMapping(value = "/login", method = {RequestMethod.POST})
    @ResponseBody
    public CommonReturnType login(@RequestBody LoginDTO loginDTO) throws BusinessException {
        //1.Verify login parameters
        ValidationResult result = validator.validate(loginDTO);
        if (result.isHasErrors()) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR, result.getErrMsg());
        }

        //2.verify whether the account and password match
        UserModel userModel = userService.getUserModelByEmail(loginDTO.getEmail());
        if (userModel == null) {
            throw new BusinessException(EnumBusinessError.USER_NOT_EXIST);
        }
        if (!bCryptPasswordEncoder.matches(loginDTO.getPassword(), userModel.getEncryptPassword())) {
            throw new BusinessException(EnumBusinessError.INVALID_PASSWORD);
        }

        Map<String, Object> returnMap = new HashMap<>(3);

        //3. Login related records and rewards
        String message = userService.loginBonus(userModel);
        if (message != null) {
            returnMap.put("bonus", message);
        }
        returnMap.put("token", JwtTokenUtils.createToken(userModel.getId(), userModel.getRole(), false));
        returnMap.put("user", convertor.userVOFromUserModel(userModel));
        return CommonReturnType.create(returnMap);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * 在前端获取UserVO，仅用于检测
     */
    @RequestMapping("/get")
    @ResponseBody
    public UserVO getUser(@RequestParam(name = "id") Integer id) throws BusinessException {
        UserModel userModel = userService.getUserById(id);
        if (userModel == null) {
            throw new BusinessException(EnumBusinessError.USER_NOT_EXIST);
        } else {
            return convertor.userVOFromUserModel(userModel);
        }
    }
}
