## react路由配置

可选参数的写法：<Route path='/index/:hello?' /> 后边的问号表示这个参数是可选的

更多可以参考：[react中路由传参的三种方式](https://www.cnblogs.com/ljh12138/p/13566406.html)
[React-router - 如何在url中带参数？在url中带参数的几种方法](https://blog.csdn.net/zrq1210/article/details/108350008)



## 怎么处理的请求？
目前有两种，一种是把要进行的操作放到action里面，比如登录的时候，登录成功，把history放到action里面，然后push跳转到home页面。
另一种是直接把请求放到调用的js里面，不用action，比如注册的写法。


## todo
当mock不开启时，怎么不把报错显示到屏幕上？也就是加一个errorbase。