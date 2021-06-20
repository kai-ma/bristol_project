package com.kaixiang.finalproject.service;

import com.kaixiang.finalproject.service.model.UserModel;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    UserModel getUserById(Integer id);

    void register(UserModel userModel) throws Exception;

    /**
     * 判断是否是合法的账号和密码
     * telephone是用户传入的telephone，encrptPassword：加密后的密码
     */
    UserModel validateLogin(String email, String encryptPassword) throws Exception;
}
