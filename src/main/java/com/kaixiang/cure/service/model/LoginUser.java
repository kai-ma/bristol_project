package com.kaixiang.cure.service.model;

/**
 * @description: LoginUser.java: 登录的传参
 * @author: Kaixiang Ma
 * @create: 2021-07-10 18:01
 */
public class LoginUser {
    private String username;
    private String password;
    private Integer rememberMe;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getRememberMe() {
        return rememberMe;
    }

    public void setRememberMe(Integer rememberMe) {
        this.rememberMe = rememberMe;
    }
}
