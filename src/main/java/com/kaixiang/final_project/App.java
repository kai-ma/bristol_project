package com.kaixiang.final_project;

import com.kaixiang.final_project.dao.UserDOMapper;
import com.kaixiang.final_project.dataobject.UserDO;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Hello world!
 */

@SpringBootApplication(scanBasePackages = {"com.kaixiang.final_project"})
@MapperScan("com.kaixiang.final_project.dao")
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
