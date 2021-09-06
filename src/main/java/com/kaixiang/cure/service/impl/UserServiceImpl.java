package com.kaixiang.cure.service.impl;

import com.kaixiang.cure.dao.UserDOMapper;
import com.kaixiang.cure.dao.UserPasswordDOMapper;
import com.kaixiang.cure.dataobject.UserDO;
import com.kaixiang.cure.dataobject.UserPasswordDO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.service.UserService;
import com.kaixiang.cure.service.model.UserModel;
import com.kaixiang.cure.utils.Convertor;
import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.Hours;
import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDOMapper userDOMapper;

    @Autowired
    private UserPasswordDOMapper userPasswordDOMapper;

    @Autowired
    private Convertor convertor;

    @Autowired
    private RedisTemplate redisTemplate;

    @Override
    public UserModel getUserById(Integer id) {

        UserDO userDO = userDOMapper.selectByPrimaryKey(id);
        if (userDO == null) {
            return null;
        }
        //通过用户id获取对应的加密密码信息
        UserPasswordDO userPasswordDO = userPasswordDOMapper.selectByUserId(id);
        return convertor.userModelFromUserDOAndPasswordDO(userDO, userPasswordDO);
    }


    @Override
    @Transactional(rollbackFor = Exception.class)
    public void register(UserModel userModel) throws BusinessException {
        //为什么必须判空？ 工作中service层和Controller层可能不是一个人做的
        if (userModel == null) {
            throw new BusinessException(EnumBusinessError.UNKNOWN_ERROR);
        }

        UserDO userDO = convertor.userDOFromUserModel(userModel);
        try {
            userDOMapper.insertSelective(userDO);
        } catch (DuplicateKeyException e) {
            throw new BusinessException(EnumBusinessError.DUPLICATE_REGISTER);
        }

        //userModel复制一下userDO的自增id
        userModel.setId(userDO.getId());
        UserPasswordDO userPasswordDO = convertPassWordFromModel(userModel);
        userPasswordDOMapper.insertSelective(userPasswordDO);
    }


    @Override
    public UserModel getUserModelByEmail(String email) {
        UserDO userDO = userDOMapper.selectByEmail(email);
        if (userDO == null) {
            return null;
        }
        UserPasswordDO userPasswordDO = userPasswordDOMapper.selectByUserId(userDO.getId());
        if (userPasswordDO == null) {
            return null;
        }
        return convertor.userModelFromUserDOAndPasswordDO(userDO, userPasswordDO);
    }

    /**
     * 修改用户设置
     *
     * @param userModel
     */
    @Override
    public void changeSettings(UserModel userModel) {
        UserDO userDO = convertor.userDOFromUserModel(userModel);
        int rows = userDOMapper.updateByPrimaryKeySelective(userDO);
        if (rows > 0) {
            //成功修改的log
        }
    }


    /**
     * 记录登录相关信息，并添加奖励
     *
     * @param userModel
     */
    @Override
    public String loginBonus(UserModel userModel) throws BusinessException {
        if (userModel.getContinuousLoginDays() == null || userModel.getLastLoginAt() == null) {
            return null;
        }
        Integer bonus = null;
        DateTime now = new DateTime();
        if (Days.daysBetween(userModel.getLastLoginAt(), now).getDays() >= 1 &&
                Hours.hoursBetween(userModel.getLastLoginAt(), now).getHours() >= 48) {
            //没有连续登录  连续登录天数归零
            userModel.setContinuousLoginDays(1);
            bonus = getBonus(1);
        } else {
            //连续登录，且不在同一天
            LocalDate localDate1 = userModel.getLastLoginAt().toLocalDate();
            LocalDate localDate2 = now.toLocalDate();
            if (!localDate1.equals(localDate2)) {
                userModel.setContinuousLoginDays(userModel.getContinuousLoginDays() + 1);
                bonus = getBonus(userModel.getContinuousLoginDays());
            }
        }
        userModel.setLastLoginAt(now);
        if (bonus != null) {
            userModel.setStamp(userModel.getStamp() + bonus);
        }

        UserDO userDO = convertor.userDOFromUserModel(userModel);
        int rows = userDOMapper.updateByPrimaryKeySelective(userDO);
        if(rows != 1){
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
        if(bonus != null){
            return "Continuous login " + userModel.getContinuousLoginDays() + " days, " + bonus +
                    (bonus > 1 ? " stamps bonus" : " stamp bonus");
        }
        return null;
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////

    private UserPasswordDO convertPassWordFromModel(UserModel userModel) {
        if (userModel == null) {
            return null;
        }
        UserPasswordDO userPasswordDO = new UserPasswordDO();
        //也能用BeanUtils.copyProperties(userModel,userPasswordDO);
        userPasswordDO.setEncryptPassword(userModel.getEncryptPassword());
        //todo 不要忘了外键
        userPasswordDO.setUserid(userModel.getId());
        return userPasswordDO;
    }

    private Integer getBonus(Integer continuousLoginDays) {
        if (continuousLoginDays >= 7) {
            return 3;
        }
        if (continuousLoginDays == 1) {
            return 1;
        }
        return continuousLoginDays / 2;
    }
}
