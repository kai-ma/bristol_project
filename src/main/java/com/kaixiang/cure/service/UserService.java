package com.kaixiang.cure.service;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.service.model.UserModel;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    UserModel getUserById(Integer id);

    void register(UserModel userModel) throws Exception;

    UserModel getUserModelByEmail(String email);

    /**
     * 修改用户设置
     */
    void changeSettings(UserModel userModel);

    /**
     * 根据登录，添加奖励
     * @param userModel
     */
    String loginBonus(UserModel userModel) throws BusinessException;
}
