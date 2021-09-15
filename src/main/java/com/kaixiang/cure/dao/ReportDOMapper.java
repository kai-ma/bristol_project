package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.ReportDO;

public interface ReportDOMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ReportDO record);

    int insertSelective(ReportDO record);

    ReportDO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ReportDO record);

    int updateByPrimaryKey(ReportDO record);
}