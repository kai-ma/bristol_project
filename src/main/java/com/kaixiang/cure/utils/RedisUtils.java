package com.kaixiang.cure.utils;

import org.springframework.stereotype.Component;

/**
 * @description: RedisUtils.java: redis通用的一些方法
 * @author: Kaixiang Ma
 * @create: 2021-08-04 16:14
 */
@Component
public class RedisUtils {
    public String generateRepliedMarkKey(Integer firstLetterId, Integer userId){
        return "FirstLetter:" + firstLetterId + "#userId:" + userId;
    }
}
