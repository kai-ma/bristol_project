package com.kaixiang.finalproject.service.impl;

import com.kaixiang.finalproject.dao.UserDOMapper;
import com.kaixiang.finalproject.dao.UserPasswordDOMapper;
import com.kaixiang.finalproject.dataobject.UserDO;
import com.kaixiang.finalproject.dataobject.UserPasswordDO;
import com.kaixiang.finalproject.service.UserService;
import com.kaixiang.finalproject.service.model.UserModel;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDOMapper userDOMapper;

    @Autowired
    private UserPasswordDOMapper userPasswordDOMapper;

    @Override
    public UserModel getUserById(Integer id) {

        UserDO userDO = userDOMapper.selectByPrimaryKey(id);
        if (userDO == null) {
            return null;
        }
        //通过用户id获取对应的加密密码信息
        UserPasswordDO userPasswordDO = userPasswordDOMapper.selectByUserId(id);
        return convertFromDataObject(userDO, userPasswordDO);
    }


    @Override
    @Transactional
    public void register(UserModel userModel) throws Exception {
        //为什么必须判空？ 工作中service层和Controller层可能不是一个人做的
        if (userModel == null) {
            throw new Exception("shif");
        }

        //todo: ValidationResult result = validator.validate(userModel);

        UserDO userDO = convertFromModel(userModel);
        try {
            userDOMapper.insertSelective(userDO);
        } catch (DuplicateKeyException e) {
            //todo:这样抛出错误是有问题的，前端会显示500错误
            throw new Exception("重复注册");
        }

        //userModel复制一下userDO的自增id
        userModel.setId(userDO.getId());
        System.out.println("user id is :" + userModel.getId());
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
    public UserModel getUserModelByEmail(String email) throws Exception {
        UserDO userDO = userDOMapper.selectByEmail(email);
        if (userDO == null) {
            throw new Exception("no such user.");
        }
        UserPasswordDO userPasswordDO = userPasswordDOMapper.selectByUserId(userDO.getId());

        return convertFromDataObject(userDO, userPasswordDO);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////


    private UserModel convertFromDataObject(UserDO userDO, UserPasswordDO userPasswordDO) {
        if (userDO == null) {
            return null;
        }
        UserModel userModel = new UserModel();
        BeanUtils.copyProperties(userDO, userModel);
        if (userPasswordDO != null) {
            userModel.setEncryptPassword(userPasswordDO.getEncryptPassword());
        }
        return userModel;
    }

    private UserDO convertFromModel(UserModel userModel) {
        if (userModel == null) {
            return null;
        }
        UserDO userDO = new UserDO();
        BeanUtils.copyProperties(userModel, userDO);
        return userDO;
    }

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