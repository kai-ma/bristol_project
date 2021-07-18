package com.kaixiang.cure.utils.encrypt;

import org.springframework.stereotype.Component;

/**
 * @description: EncryptUtilsImpl.java: 实现类
 * @author: Kaixiang Ma
 * @create: 2021-07-18 13:34
 */
@Component
public class EncryptUtilsImpl implements EncryptUtils {
    /**
     * todo: 加密
     *
     * @param content
     */
    @Override
    public String encrypt(String content) {
        return content;
    }

    @Override
    public String decrypt(String content) {
        return content;
    }
}
