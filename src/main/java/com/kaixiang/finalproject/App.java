package com.kaixiang.finalproject;

import com.kaixiang.finalproject.dao.UserDOMapper;
import com.kaixiang.finalproject.dataobject.UserDO;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(scanBasePackages = {"com.kaixiang.finalproject"})
@MapperScan("com.kaixiang.finalproject.dao")
@RestController
public class App {

    @Autowired
    private UserDOMapper userDOMapper;

    @RequestMapping("/")
    public String home() {
        UserDO userDO = userDOMapper.selectByPrimaryKey(1);
        if (userDO == null) {
            return "user is not exist";
        } else {
            return userDO.getUsername();
        }
//        return "Hello World!";
    }

    public static void main(String[] args) {
        System.out.println("Start springboot application!");
        SpringApplication.run(App.class, args);
    }
}
