package com.kaixiang.cure.controller;

import com.kaixiang.cure.controller.dataobject.ReportDTO;
import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.response.CommonReturnType;
import com.kaixiang.cure.service.ReportService;
import com.kaixiang.cure.service.model.ReportModel;
import com.kaixiang.cure.utils.Convertor;
import com.kaixiang.cure.utils.annotation.UserLoginToken;
import com.kaixiang.cure.utils.validator.ValidationResult;
import com.kaixiang.cure.utils.validator.ValidatorImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static com.kaixiang.cure.utils.Constants.ATTRIBUTE_KEY_USERID;

/**
 * @description: ReportController.java: 用户举报相关操作
 * @author: Kaixiang Ma
 * @create: 2021-09-07 21:04
 */
@Controller("api/report")
@RequestMapping("api/report")
@CrossOrigin
public class ReportController {
    @Autowired
    private ReportService reportService;

    @Autowired
    private Convertor convertor;

    @Autowired
    private ValidatorImpl validator;
    /**
     * 举报
     */
    @RequestMapping(value = "/send", method = {RequestMethod.POST})
    @ResponseBody
    @UserLoginToken
    public CommonReturnType report(@RequestBody ReportDTO reportDTO, HttpServletRequest request) throws BusinessException {
        //校验参数
        ValidationResult result = validator.validate(reportDTO);
        if (result.isHasErrors()) {
            throw new BusinessException(EnumBusinessError.PARAMETER_VALIDATION_ERROR, result.getErrMsg());
        }
        //1.构建完整的FirstLetterModel，从token中获取userId
        ReportModel reportModel = convertor.reportModelFromReportDTO(reportDTO);
        reportModel.setUserid(getUserIdFromToken(request));
        reportService.report(reportModel);
        return CommonReturnType.create("Report successfully!");
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    private Integer getUserIdFromToken(HttpServletRequest request){
        return (Integer) request.getAttribute(ATTRIBUTE_KEY_USERID);
    }
}
