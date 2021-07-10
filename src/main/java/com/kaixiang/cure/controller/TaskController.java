package com.kaixiang.cure.controller;

import org.springframework.web.bind.annotation.*;

/**
 * @description: TaskController.java: 用于登录校验测试
 * @author: Kaixiang Ma
 * @create: 2021-07-10 18:32
 */
@RestController
@RequestMapping("/tasks")
public class TaskController {

    @GetMapping
    public String listTasks() {
        return "任务列表";
    }

    @PostMapping
    public String newTasks() {
        return "创建了一个新的任务";
    }

    @PutMapping("/{taskId}")
    public String updateTasks(@PathVariable("taskId") Integer id) {
        return "更新了一下id为:" + id + "的任务";
    }

    @DeleteMapping("/{taskId}")
    public String deleteTasks(@PathVariable("taskId") Integer id) {
        return "删除了id为:" + id + "的任务";
    }
    //TODO:这种url输错的错误怎么捕获？ 需要捕获么 比如当url没有/1的时候，报错：Resolved [org.springframework.web.HttpRequestMethodNotSupportedException: Request method 'DELETE' not supported]
}