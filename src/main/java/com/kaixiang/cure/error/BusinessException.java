package com.kaixiang.cure.error;

/**
 * @description: BusinessException.java: 任何程序的跑不下去的异常，都统一抛出一个
 * BusinessException。这个exception会被controller层的springboot的handler捕获，并做一些处理
 * @author: Kaixiang Ma
 * @create: 2021-06-26 14:18
 */
public class BusinessException extends Exception implements CommonError {

    /**
     * BusinessException内部强关联一个CommonError——其实就是EnumBusinessError
     */
    private CommonError commonError;

    /**
     * 直接接收EnumBusinessError的传参，用于构造业务异常。
     */
    public BusinessException(CommonError commonError) {
        super();
        this.commonError = commonError;
    }

    /**
     * 接收自定义errMsg的方式构造业务异常
     * 改写errMsg，实现相同状态码，不同的描述信息
     */
    public BusinessException(CommonError commonError, String errorMessage) {
        super();
        this.commonError=commonError;
        this.commonError.setErrorMessage(errorMessage);
    }

    /**
     * 获取错误码
     *
     * @return ErrorCode
     */
    @Override
    public int getErrorCode() {
        return this.commonError.getErrorCode();
    }

    /**
     * 获取错误信息
     *
     * @return ErrorMessage
     */
    @Override
    public String getErrorMessage() {
        return this.commonError.getErrorMessage();
    }

    /**
     * 同一个错误码，注入不同的错误信息提示
     *
     * @param errorMessage
     * @return BusinessException
     */
    @Override
    public CommonError setErrorMessage(String errorMessage) {
        this.commonError.setErrorMessage(errorMessage);
        return this;
    }
}
