package com.kaixiang.cure.utils;

import com.kaixiang.cure.controller.viewobject.ConversationVOInAnswerBook;
import com.kaixiang.cure.controller.viewobject.FirstLetterVO;
import com.kaixiang.cure.controller.viewobject.LetterVO;
import com.kaixiang.cure.controller.viewobject.TopicVO;
import com.kaixiang.cure.dataobject.ConversationDO;
import com.kaixiang.cure.dataobject.FirstLetterDO;
import com.kaixiang.cure.dataobject.LetterDO;
import com.kaixiang.cure.dataobject.TopicDO;
import com.kaixiang.cure.service.model.ConversationModelInAnswerBook;
import com.kaixiang.cure.service.model.FirstLetterModel;
import com.kaixiang.cure.service.model.LetterModel;
import com.kaixiang.cure.service.model.TopicModel;
import com.kaixiang.cure.utils.encrypt.EncryptUtils;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

import static com.kaixiang.cure.utils.Constants.FIRST_LETTER_TYPE;

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

    public LetterModel letterModelFromLetterDO(LetterDO letterDO) {
        if (letterDO == null) {
            return null;
        }
        LetterModel letterModel = new LetterModel();
        BeanUtils.copyProperties(letterDO, letterModel);
        letterModel.setContent(letterDO.getFilepath());
        letterModel.setCreatedAt(new DateTime(letterDO.getCreatedAt()));
        return letterModel;
    }

    public TopicModel topicModelFromTopicDO(TopicDO topicDO) {
        if (topicDO == null) {
            return null;
        }
        TopicModel topicModel = new TopicModel();
        BeanUtils.copyProperties(topicDO, topicModel);
        return topicModel;
    }

    public TopicVO topicVOFromTopicModel(TopicModel topicModel) {
        if (topicModel == null) {
            return null;
        }
        TopicVO topicVO = new TopicVO();
        BeanUtils.copyProperties(topicModel, topicVO);
        topicVO.setText(topicModel.getName());
        topicVO.setIcon(topicModel.getImgURL());
        return topicVO;
    }

    public FirstLetterModel firstLetterModelFromFirstLetterDO(FirstLetterDO firstLetterDO, Integer conversationId) {
        if (firstLetterDO == null) {
            return null;
        }
        FirstLetterModel firstLetterModel = new FirstLetterModel();
        BeanUtils.copyProperties(firstLetterDO, firstLetterModel);
        firstLetterModel.setCreatedAt(new DateTime(firstLetterDO.getCreatedAt()));
        if (firstLetterDO.getReplyNumber() != null && firstLetterDO.getReplyNumber() != 0) {
            firstLetterModel.setLastRepliedAt(new DateTime(firstLetterDO.getLastRepliedAt()));
        }
        firstLetterModel.setContent(firstLetterDO.getFilepath());
        firstLetterModel.setUserId(Integer.valueOf(encryptUtils.decrypt(firstLetterDO.getUserid())));
        if (conversationId != null) {
            firstLetterModel.setConversationId(conversationId);
        }
        firstLetterModel.setType(FIRST_LETTER_TYPE);
        return firstLetterModel;
    }

    public ConversationVOInAnswerBook conversationVOInAnswerBookFromConversationModelInAnswerBook(ConversationModelInAnswerBook conversationModelInAnswerBook) {
        if (conversationModelInAnswerBook == null) {
            return null;
        }
        ConversationVOInAnswerBook conversationVOInAnswerBook = new ConversationVOInAnswerBook();
        BeanUtils.copyProperties(conversationModelInAnswerBook, conversationVOInAnswerBook);
        if (conversationModelInAnswerBook.getCollectedAt() != null) {
            conversationVOInAnswerBook.setCollectedAt(conversationModelInAnswerBook.getCollectedAt().
                    toString(DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")));
        }
        List<LetterModel> letterModelList = conversationModelInAnswerBook.getLetterModelList();
        conversationVOInAnswerBook.setLetterVOList(letterModelList.stream().map(this::letterVOFromLetterModel).collect(Collectors.toList()));
        return conversationVOInAnswerBook;
    }

    /**
     * 将lettterModel转换成lettervo，如果是firstLetterModel，type=2，转型以后转换成firstLetterVO
     */
    public LetterVO letterVOFromLetterModel(LetterModel letterModel) {
        if (letterModel == null) {
            return null;
        }
        //如果是第一封信，需要写入title
        if (letterModel.getType().equals(FIRST_LETTER_TYPE)) {
            FirstLetterVO firstLetterVO = new FirstLetterVO();
            firstLetterVO.setTitle(((FirstLetterModel) letterModel).getTitle());
            BeanUtils.copyProperties(letterModel, firstLetterVO);
            if (letterModel.getCreatedAt() != null) {
                firstLetterVO.setCreatedAt(letterModel.getCreatedAt().
                        toString(DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")));
            }
            if (((FirstLetterModel) letterModel).getLastRepliedAt() != null) {
                firstLetterVO.setCreatedAt(((FirstLetterModel) letterModel).getLastRepliedAt().
                        toString(DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")));
            }
            return firstLetterVO;
        } else {
            LetterVO letterVO = new LetterVO();
            BeanUtils.copyProperties(letterModel, letterVO);
            if (letterModel.getCreatedAt() != null) {
                letterVO.setCreatedAt(letterModel.getCreatedAt().
                        toString(DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss")));
            }
            return letterVO;
        }
    }


    public FirstLetterDO firstLetterDOFromModel(FirstLetterModel firstLetterModel) {
        if (firstLetterModel == null) {
            return null;
        }
        FirstLetterDO firstLetterDO = new FirstLetterDO();
        BeanUtils.copyProperties(firstLetterModel, firstLetterDO);
        firstLetterDO.setUserid(encryptUtils.encrypt(String.valueOf(firstLetterModel.getUserId())));
        firstLetterDO.setFilepath(firstLetterModel.getContent());
        return firstLetterDO;
    }
}
