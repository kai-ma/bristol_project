package com.kaixiang.cure.controller;

import com.kaixiang.cure.error.BusinessException;
import com.kaixiang.cure.error.EnumBusinessError;
import com.kaixiang.cure.utils.JwtTokenUtils;
import com.kaixiang.cure.utils.annotation.PassToken;
import com.kaixiang.cure.utils.annotation.UserLoginToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

import static com.kaixiang.cure.utils.Constants.ATTRIBUTE_KEY_USERID;

/**
 * @description: AuthenticationInterceptor.java: 拦截器去获取token并验证token
 * 参考：https://www.jianshu.com/p/e88d3f8151db
 * @author: Kaixiang Ma
 */
public class AuthenticationInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object object) throws Exception {
        // 从 http 请求头中取出 token
        String token = httpServletRequest.getHeader(JwtTokenUtils.TOKEN_HEADER);
        // 如果不是映射到方法直接通过
        if (!(object instanceof HandlerMethod)) {
            return true;
        }
        HandlerMethod handlerMethod = (HandlerMethod) object;
        Method method = handlerMethod.getMethod();
        //检查是否有passtoken注释，有则跳过认证
        if (method.isAnnotationPresent(PassToken.class)) {
            PassToken passToken = method.getAnnotation(PassToken.class);
            if (passToken.required()) {
                return true;
            }
        }
        //检查有没有需要用户权限的注解
        if (method.isAnnotationPresent(UserLoginToken.class)) {
            UserLoginToken userLoginToken = method.getAnnotation(UserLoginToken.class);
            if (userLoginToken.required()) {
                // 执行认证
                if (token == null || !token.startsWith(JwtTokenUtils.TOKEN_PREFIX)) {
                    throw new BusinessException(EnumBusinessError.TOKEN_ILLEGAL);
                }
                Integer userId;
                try {
                    Claims claims = JwtTokenUtils.getTokenBody(token.substring(7));
                    // 获取 token 中的 信息
                    userId = Integer.valueOf(claims.getSubject());
                    String role = (String) claims.get("role");
                } catch (ExpiredJwtException e) {
                    //todo：对于返回token过期的，应该调用logout并且跳转到登录页面。20003错误码
                    throw new BusinessException(EnumBusinessError.TOKEN_EXPIRED);
                } catch (UnsupportedJwtException e) {
                    throw new BusinessException(EnumBusinessError.TOKEN_ILLEGAL);
                } catch (Exception e) {
                    throw new BusinessException(EnumBusinessError.UNKNOWN_ERROR.setErrorMessage("Please relogin."));
                }
                httpServletRequest.setAttribute(ATTRIBUTE_KEY_USERID, userId);
                return true;
            }
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}

