package com.kaixiang.cure;

import com.kaixiang.cure.dao.UserDOMapper;
import com.kaixiang.cure.dataobject.UserDO;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(scanBasePackages = {"com.kaixiang.cure"}, exclude = {SecurityAutoConfiguration.class})
@MapperScan("com.kaixiang.cure.dao")
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
            return userDO.getPseudonym();
        }
//        return "Hello World!";
    }

    public static void main(String[] args) {
        System.out.println("Start springboot application!");
        SpringApplication.run(App.class, args);
    }
}
