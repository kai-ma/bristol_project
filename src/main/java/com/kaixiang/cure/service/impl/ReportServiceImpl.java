package com.kaixiang.cure.service.impl;

import com.kaixiang.cure.dao.ReportDOMapper;
import com.kaixiang.cure.dataobject.ReportDO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.service.ReportService;
import com.kaixiang.cure.service.model.ReportModel;
import com.kaixiang.cure.utils.Convertor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

/**
 * @description: ReportServiceImpl.java:
 * @author: Kaixiang Ma
 * @create: 2021-09-07 21:06
 */
@Service
public class ReportServiceImpl implements ReportService {
    @Autowired
    private ReportDOMapper reportDOMapper;

    @Autowired
    private Convertor convertor;

    @Override
    public void report(ReportModel reportModel) throws BusinessException {
        if (reportModel == null) {
            throw new BusinessException(EnumBusinessError.UNKNOWN_ERROR);
        }

        ReportDO reportDO = convertor.reportDOFromModel(reportModel);
        try {
            reportDOMapper.insertSelective(reportDO);
        } catch (DuplicateKeyException e) {
            throw new BusinessException(EnumBusinessError.DUPLICATE_REPORT);
        }
    }
}
