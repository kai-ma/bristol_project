package com.kaixiang.cure.controller.dataobject;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
 * @description: RegisterDTO.java: 用于注册的dto
 * @author: Kaixiang Ma
 * @create: 2021-09-04 17:08
 */
public class RegisterDTO {
    @NotBlank(message = "Pseudonym can't be empty")
    @Length(max = 30, message = "Too much characters for pseudonym")
    @Length(min = 3, message = "Too few characters for pseudonym")
    private String pseudonym;

    @NotBlank(message = "Email can't be empty")
    @Length(max = 99, message = "Please provide a valid email address")
    @Length(min = 6, message = "Please provide a valid email address")
    @Email(message="Please provide a valid email address")
    private String email;

    @NotBlank(message = "Password can't be empty")
    @Length(max = 16, message = "Too much characters for password")
    @Length(min = 6, message = "Too few characters for password")
    private String password;

    public String getPseudonym() {
        return pseudonym;
    }

    public void setPseudonym(String pseudonym) {
        this.pseudonym = pseudonym;
    }

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
