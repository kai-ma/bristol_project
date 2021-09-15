package com.kaixiang.cure.service;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.service.model.ReportModel;

public interface ReportService {

    void report(ReportModel reportModel) throws BusinessException;
}
