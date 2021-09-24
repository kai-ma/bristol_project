package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.StampBonusDO;

import java.util.List;

public interface StampBonusDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(StampBonusDO record);

    int insertSelective(StampBonusDO record);

    StampBonusDO selectByPrimaryKey(Integer id);

    List<StampBonusDO> listByUserId(Integer userId);

    int updateByPrimaryKeySelective(StampBonusDO record);

    int updateByPrimaryKey(StampBonusDO record);
}