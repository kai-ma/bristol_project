package com.kaixiang.cure.service.impl;

import com.kaixiang.cure.dao.FeedbackDOMapper;
import com.kaixiang.cure.dao.StampBonusDOMapper;
import com.kaixiang.cure.dao.UserDOMapper;
import com.kaixiang.cure.dao.UserPasswordDOMapper;
import com.kaixiang.cure.dataobject.FeedbackDO;
import com.kaixiang.cure.dataobject.StampBonusDO;
import com.kaixiang.cure.dataobject.UserDO;
import com.kaixiang.cure.dataobject.UserPasswordDO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.service.UserService;
import com.kaixiang.cure.service.model.FeedbackModel;
import com.kaixiang.cure.service.model.StampBonusModel;
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
import sun.misc.BASE64Encoder;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @Autowired
    private FeedbackDOMapper feedbackDOMapper;

    @Autowired
    private StampBonusDOMapper stampBonusDOMapper;

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
        UserModel userModel = convertor.userModelFromUserDOAndPasswordDO(userDO, userPasswordDO);
        if (userModel != null && userModel.getContinuousLoginDays() != null) {
            userModel.setBonusTomorrow(getBonus(userModel.getContinuousLoginDays() + 1));
        }
        return userModel;
    }

    /**
     * 修改用户设置
     *
     * @param userModel
     */
    @Override
    public void changeSettings(UserModel userModel) throws BusinessException {
        UserDO userDO = convertor.userDOFromUserModel(userModel);
        int rows = userDOMapper.updateByPrimaryKeySelective(userDO);
        if (rows != 1) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }
    }


    /**
     * 记录登录相关信息，并添加奖励
     *
     * @param userModel: userModel
     * @return: Reward reminder display in the home page.
     */
    @Override
    public String loginBonus(UserModel userModel) throws BusinessException {
        if (userModel.getContinuousLoginDays() == null) {
            return null;
        }
        int bonus = 0;
        boolean firstTimeLogin = false;
        DateTime now = new DateTime();
        //login for the first time
        if (userModel.getLastLoginAt() == null) {
            userModel.setLastLoginAt(now);
            userModel.setContinuousLoginDays(1);
            bonus = 3;
            userModel.setStamp(3);
            firstTimeLogin = true;
        } else {
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
            if (bonus != 0) {
                userModel.setStamp(userModel.getStamp() + bonus);
            }
        }

        UserDO userDO = convertor.userDOFromUserModel(userModel);
        int rows = userDOMapper.updateByPrimaryKeySelective(userDO);
        if (rows != 1) {
            throw new BusinessException(EnumBusinessError.DATABASE_EXCEPTION);
        }

        if (bonus != 0) {
            addBonusRecord(userModel, bonus);
        }


        if (firstTimeLogin) {
            return "Login for the first time, reward 3 stamps";
        }
        if (bonus != 0) {
            return "Congratulations! Get " + bonus + (bonus > 1 ? " stamps bonus" : " stamp bonus")
                    + " for logging in " + userModel.getContinuousLoginDays() + " consecutive days";
        }
        return null;
    }


    private int addBonusRecord(UserModel userModel, int bonus) {
        StampBonusDO stampBonusDO = new StampBonusDO();
        stampBonusDO.setUserId(userModel.getId());
        stampBonusDO.setReason(0);
        stampBonusDO.setBonus(bonus);
        return stampBonusDOMapper.insertSelective(stampBonusDO);
    }


    /**
     * 获取用户的信息 用于user页面展示
     *
     * @param userId
     */
    @Override
    public UserModel getUserInfo(Integer userId) throws BusinessException {
        if (userId == null) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        UserDO userDO = userDOMapper.selectByPrimaryKey(userId);
        if (userDO == null) {
            throw new BusinessException(EnumBusinessError.USER_NOT_EXIST);
        }
        UserModel userModel = convertor.userModelFromUserDOAndPasswordDO(userDO, null);
        if (userModel != null && userModel.getContinuousLoginDays() != null) {
            userModel.setBonusTomorrow(getBonus(userModel.getContinuousLoginDays() + 1));
        }
        return userModel;
    }

    private static final String slat = "%fsf102%%1242e(&(&*%122";

    @Override
    public void feedback(FeedbackModel feedbackModel) throws BusinessException {
        if (feedbackModel == null) {
            throw new BusinessException(EnumBusinessError.UNKNOWN_ERROR);
        }
        String md5 = null;
        try {
            md5 = encodeByMD5(feedbackModel.toString());
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        feedbackModel.setMd5(md5);
        FeedbackDO feedbackDO = convertor.feedBackDOFromModel(feedbackModel);
        try {
            feedbackDOMapper.insertSelective(feedbackDO);
        } catch (DuplicateKeyException e) {
            throw new BusinessException(EnumBusinessError.DUPLICATE_FEEDBACK);
        }
    }

    /**
     * 密码加密
     */
    public String encodeByMD5(String str) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        //确定计算方法
        MessageDigest md5 = MessageDigest.getInstance("MD5");
        BASE64Encoder base64Encoder = new BASE64Encoder();
        //加密字符串
        String newstr = base64Encoder.encode(md5.digest(str.getBytes("utf-8")));
        return newstr;
    }

    @Override
    public List<StampBonusModel> getStampBonus(Integer userId) throws BusinessException {
        if (userId == null) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        List<StampBonusDO> stampBonusDOList = stampBonusDOMapper.listByUserId(userId);
        return stampBonusDOList.stream().map(stampBonusDO -> convertor.stampBonusModelFromDO(stampBonusDO)
        ).collect(Collectors.toList());
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

    @SuppressWarnings("serial")
    private final static Map<Integer, Integer> loginBonus = new HashMap<Integer, Integer>() {
        {
            put(1, 1);
            put(2, 2);
            put(3, 2);
            put(4, 2);
            put(5, 3);
            put(6, 3);
            put(7, 3);
        }
    };

    private Integer getBonus(Integer continuousLoginDays) {
        if (continuousLoginDays <= 0) {
            return 0;
        }
        if (loginBonus.containsKey(continuousLoginDays)) {
            return loginBonus.get(continuousLoginDays);
        }
        return 4;
    }
}
