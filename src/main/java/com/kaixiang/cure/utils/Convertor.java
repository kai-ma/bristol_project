package com.kaixiang.cure.utils;

import com.kaixiang.cure.dataobject.ConversationDO;
import com.kaixiang.cure.dataobject.LetterDO;
import com.kaixiang.cure.service.model.LetterModel;
import com.kaixiang.cure.utils.encrypt.EncryptUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @description: Convertor.java: 各种model之间的转换
 * @author: Kaixiang Ma
 * @create: 2021-07-18 13:25
 */
@Component
public class Convertor {
    @Autowired
    private EncryptUtils encryptUtils;

    /**
     * 注意conversation的接收方和回信的接收方是相反的。
     */
    public ConversationDO conversationDOFromLetterModel(LetterModel letterModel) {
        if (letterModel == null) {
            return null;
        }
        ConversationDO conversationDO = new ConversationDO();
        //回信 收件人是首封信的发件人
        if (letterModel.getType() != null && letterModel.getType() == 0) {
            conversationDO.setEncryptSenderUserid(encryptUtils.encrypt(String.valueOf(letterModel.getAddresseeUserId())));
            conversationDO.setEncryptAddresseeUserid(encryptUtils.encrypt(String.valueOf(letterModel.getSenderUserId())));
        } else {
            //发件人是首封信的发件人
            conversationDO.setEncryptSenderUserid(encryptUtils.encrypt(String.valueOf(letterModel.getSenderUserId())));
            conversationDO.setEncryptAddresseeUserid(encryptUtils.encrypt(String.valueOf(letterModel.getAddresseeUserId())));
        }
        conversationDO.setFirstLetterId(letterModel.getFirstLetterId());
        return conversationDO;
    }

    public LetterDO letterDOFromLetterModel(LetterModel letterModel) {
        if (letterModel == null) {
            return null;
        }
        LetterDO letterDO = new LetterDO();
        letterDO.setFilepath(letterModel.getContent());
        letterDO.setType(letterModel.getType());
        return letterDO;
    }

}
