package com.kaixiang.cure.utils.validator;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Set;

/**
 * @description: ValidatorImpl.java: 校验实现
 * @author: Kaixiang Ma
 */
@Component  //把当前class放入bean中
public class ValidatorImpl implements InitializingBean {
    private Validator validator;

    @Override
    public void afterPropertiesSet() throws Exception {
        /*将hibernate validate通过工厂化的初始化方式使其实例化
         * build了一个实现了javax.Validator接口的校验器*/
        this.validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    //实现校验方法并返回校验结果
    public ValidationResult validate(Object bean) {
        ValidationResult result = new ValidationResult();
        //若对应bean中的参数规则违背了对应validation定义的@的话，set中就会有这个值
        Set<ConstraintViolation<Object>> constraintViolationSet = validator.validate(bean);
        if (constraintViolationSet.size() > 0) {  //有错误
            result.setHasErrors(true);
            //有错误，遍历对应的set   java8 lambda表达式
            constraintViolationSet.forEach(constraintViolation -> {
                String errMsg = constraintViolation.getMessage();  //把存放的errMsg--错误信息提取出来
                String propertyName = constraintViolation.getPropertyPath().toString();  //把错误字段名提取出来
                result.getErrorMsgMap().put(propertyName, errMsg);
            });
        }
        return result;
    }
}
