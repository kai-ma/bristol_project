package com.kaixiang.cure.response;

/**
 * @author Kaixiang Ma
 */
public class CommonReturnType {
    private String status;

    /**
     * status=success，则data内返回前端需要的json数据。
     * status=fail，则data内使用通用的错误码格式。
     */
    private Object data;

    /**
     * 通用的创建方法
     * 如果不带任何status，对应的status就是success，传入的result是data
     */
    public static CommonReturnType create(Object result) {
        return CommonReturnType.create(result, "success");
    }

    /**
     * 通用返回success的具体实现
     */
    public static CommonReturnType create(Object result, String status) {
        CommonReturnType commonReturnType = new CommonReturnType();
        commonReturnType.setStatus(status);
        commonReturnType.setData(result);
        return commonReturnType;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
