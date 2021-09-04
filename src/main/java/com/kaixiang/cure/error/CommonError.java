package com.kaixiang.cure.error;

/**
 * @description: CommonError.java:
 * @author: Kaixiang Ma
 * @create: 2021-06-26 14:21
 */
public interface CommonError {
    /**
     * 获取错误码
     * @return ErrorCode
     */
    public int getErrorCode();

    /**
     * 获取错误信息
     * @return ErrorMessage
     */
    public String getErrorMessage();


    /**
     * 同一个错误码，注入不同的错误信息提示
     */
    public CommonError setErrorMessage(String errorMessage);
}
