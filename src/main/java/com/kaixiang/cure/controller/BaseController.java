package com.kaixiang.cure.controller;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.response.CommonReturnType;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * @description: BaseController.java: 所有Controller通用的方法，比如返回自定义异常信息
 * @author: Kaixiang Ma
 * @create: 2021-06-26 15:12
 */
@ControllerAdvice
public class BaseController {
    //spring指明什么样的exception会进入它的处理环节 这里是Exception.class 根类
    @ExceptionHandler(Exception.class)
    //businessException应该是业务逻辑的正常问题，而不是服务端不能处理的500错误。
    //即便Controller返回exception，捕获掉它，并返回OK 200  而不是500
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Object handlerException(HttpServletRequest request, Exception exception) {
        Map<String, Object> responseData = new HashMap<>();
        if (exception instanceof BusinessException) {
            BusinessException businessException = (BusinessException) exception;
            responseData.put("errCode", businessException.getErrorCode());
            responseData.put("errMsg", businessException.getErrorMessage());
        } else { //未知错误 返回EnumBusinessError中的UNKNOWN_ERROT
            responseData.put("errCode", EnumBusinessError.UNKNOWN_ERROR.getErrorCode());
            responseData.put("errMsg", EnumBusinessError.UNKNOWN_ERROR.getErrorMessage());
        }
        return CommonReturnType.create(responseData, "fail");
    }
}
