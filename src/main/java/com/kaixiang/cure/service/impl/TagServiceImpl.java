package com.kaixiang.cure.service.impl;

import com.kaixiang.cure.dao.TagDOMapper;
import com.kaixiang.cure.dataobject.TagDO;
import com.kaixiang.cure.service.TagService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * @description: TagServiceImpl.java: tag相关操作  todo：tagIdToTagName是不是应该在静态类中
 * @author: Kaixiang Ma
 * @create: 2021-08-03 17:14
 */
@Service
public class TagServiceImpl implements TagService {
    //保存在内存中
    Map<Integer, String> tagIdToTagName;

    @Autowired
    private TagDOMapper tagDOMapper;

    @Override
    public String getTagNameById(Integer tagId) {
        //没有初始化，先初始化
        if (tagIdToTagName == null) {
            tagIdToTagName = new HashMap<>();
        }
        String tagName = tagIdToTagName.get(tagId);
        if (StringUtils.isNotBlank(tagName)) {
            return tagName;
        }
        TagDO tagDO = tagDOMapper.selectByPrimaryKey(tagId);
        tagIdToTagName.put(tagDO.getId(), tagDO.getName());
        return tagDO.getName();
    }
}
