package com.kaixiang.cure.controller.dataobject;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
 * @description: LoginDTO.java: 用户登录的入参
 * @author: Kaixiang Ma
 * @create: 2021-09-04 17:44
 */
public class LoginDTO {
    @NotBlank(message = "Email can't be empty")
    @Length(max = 99, message = "Please provide a valid email address")
    @Length(min = 6, message = "Please provide a valid email address")
    @Email(message="Please provide a valid email address")
    private String email;

    @NotBlank(message = "Password can't be empty")
    @Length(max = 16, message = "Invalid password")
    @Length(min = 6, message = "Invalid password")
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
