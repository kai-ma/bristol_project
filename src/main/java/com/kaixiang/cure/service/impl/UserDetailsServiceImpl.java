package com.kaixiang.cure.service.impl;

/**
 * @description: UserDetailsServiceImpl.java: 使用springSecurity需要实现UserDetailsService接口供权限框架调用，该方法只需要实现一个方法就可以了，那就是根据用户名去获取用户
 * @author: Kaixiang Ma
 * @create: 2021-07-10 17:45
 */

import com.kaixiang.cure.service.UserService;
import com.kaixiang.cure.service.model.JwtUser;
import com.kaixiang.cure.service.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserModel userModel = userService.getUserModelByEmail(email);
        return new JwtUser(userModel);
    }

    private Collection<GrantedAuthority> getGrantedAuthority(String role) {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        if ("ROLE_ADMIN".equalsIgnoreCase(role)) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        //这里是既要添加ROLE_ADMIN，又要添加ROLE_USER吗？应该是
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return authorities;
    }
}
