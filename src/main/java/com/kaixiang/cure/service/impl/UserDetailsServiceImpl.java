package com.kaixiang.cure.service.impl;

import com.kaixiang.cure.service.UserService;
import com.kaixiang.cure.service.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) {
        UserModel userModel = null;
        try {
            userModel = userService.getUserModelByEmail(email);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new User(userModel.getEmail(), userModel.getEncryptPassword(), getGrantedAuthority(userModel.getRole()));
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
