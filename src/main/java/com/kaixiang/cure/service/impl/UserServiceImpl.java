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
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
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
    public UserModel validateLogin(String email, String encryptPassword) throws Exception {
        UserModel userModel = getUserModelByEmail(email);

        //2.对比数据库中用户信息内的加密密码和用户输入的密码是否匹配
        if (!StringUtils.equals(encryptPassword, userModel.getEncryptPassword())) {
            throw new Exception("USER_LOGIN_FAIL");
        }
        return userModel;
    }


    @Override
    public UserModel getUserModelByEmail(String email) {
        UserDO userDO = userDOMapper.selectByEmail(email);
        if(userDO == null){
            return null;
        }
        UserPasswordDO userPasswordDO = userPasswordDOMapper.selectByUserId(userDO.getId());
        if(userPasswordDO == null){
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
        if(rows > 0){
            //成功修改的log
        }
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

}
