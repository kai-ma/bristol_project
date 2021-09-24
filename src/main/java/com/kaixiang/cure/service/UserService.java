package com.kaixiang.cure.service;

import com.kaixiang.cure.dataobject.StampBonusDO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.service.model.FeedbackModel;
import com.kaixiang.cure.service.model.StampBonusModel;
import com.kaixiang.cure.service.model.UserModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    UserModel getUserById(Integer id);

    void register(UserModel userModel) throws Exception;

    UserModel getUserModelByEmail(String email);

    /**
     * 修改用户设置
     */
    void changeSettings(UserModel userModel) throws BusinessException;

    /**
     * 根据登录，添加奖励
     * @param userModel
     */
    String loginBonus(UserModel userModel) throws BusinessException;

    /**
     * 获取用户的信息 用于user页面展示
     * @param userId
     */
    UserModel getUserInfo(Integer userId) throws BusinessException;

    List<StampBonusModel> getStampBonus(Integer userId) throws BusinessException;

    void feedback(FeedbackModel feedbackModel) throws BusinessException;
}
