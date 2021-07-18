package com.kaixiang.cure.error;

/**
 * @author : Kaixiang Ma.
 * @description: 业务错误通用常量
 */
public enum EnumBusinessError implements CommonError {

    //通用错误类型1000开头表示参数不合法
    // 任何参数不合法都是1000错误码，对应的不同参数不合法可以用setErrMsg()方法修改
    //比如邮箱输入不合法，不能输入特殊字符等等。
    PARAMETER_VALIDATION_ERROR(100001, "参数不合法"),

    //
    UNKNOWN_ERROR(10002, "Unknown error"),

    //2000开头为用户信息相关错误
    USER_NOT_EXIST(20001,"User not exist, please retry"),
    DUPLICATE_REGISTER(20002,"Duplicate register"),
    TOKEN_EXPIRED(20003,"please refresh and log in"),
    TOKEN_ILLEGAL(20004,"Invalid token, please refresh and log in"),
    INVALID_PASSWORD(20005,"Incorrect password or email, please retry"),

    DATABASE_EXCEPTION(30001, "数据库错误"),
    DUPLICATE_REPLY_TO_FIRST_LETTER(30002, "Duplicate reply"),


    REFRESH_LIMIT(40001, "Refresh time is not yet reached."),

    ;

    /**
     * 错误码
     */
    private int errorCode;
    /**
     * 错误信息
     */
    private String errorMessage;

    EnumBusinessError(int errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    /**
     * 获取错误码
     *
     * @return ErrorCode
     */
    @Override
    public int getErrorCode() {
        return errorCode;
    }

    /**
     * 获取错误信息
     *
     * @return ErrorMessage
     */
    @Override
    public String getErrorMessage() {
        return errorMessage;
    }

    /**
     * 同一个错误码，注入不同的错误信息提示
     *
     * @return: EnumBusinessError.
     */
    @Override
    public CommonError setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
        return this;
    }
}
