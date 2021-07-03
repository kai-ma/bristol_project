## 前端组件
https://mobile.ant.design/components/nav-bar-cn/
nav bar可以用作详情页面里面的返回

https://mobile.ant.design/components/popover-cn/
Popover可以用做详情页面里面的选择 结合nav bar

https://mobile.ant.design/components/pagination-cn/
Pagination 分页器可以做answer book里面的分页


https://mobile.ant.design/components/tab-bar-cn/
TabBar里面使用 Badge 进行消息提示  tabbar里面有示例


button里面有loading button


https://mobile.ant.design/components/input-item-cn/
InputItem 
单行文本输入，有各种各样的效果

https://mobile.ant.design/components/textarea-item-cn/
TextareaItem 多行输入 

https://mobile.ant.design/components/badge-cn/
Badge 徽标数  可以用在user页面


Card 卡片
用于组织信息和操作，通常也作为详细信息的入口。
形状为矩形。
可包含多种类型的元素，eg：图片、文字、按钮等。


Grid 宫格
用于answerbook

Tag 标签
进行标记和分类的小标签，用于标记事物的属性和维度，以及进行分类。

ActivityIndicator 活动指示器
活动指示器。 表明某个任务正在进行中。可以用作loading


Modal 对话框 
用于通知


Toast 轻提示
一种轻量级反馈/提示，可以用来显示不会打断用户操作的内容，适合用于页面转场、数据交互的等场景中。
用于回复成功等。


ListView 长列表
适用于显示同类的长列表数据类型，对渲染性能有一定的优化效果。
可以用于answer book，conversation detail


## 思路 比较重要
不登陆也可以看信，不需要welcome界面。需要修改后端数据库

## 后续
3. 等项目做完了，react性能优化
4-2. 懒加载优化


create-react-app创建的 
不知道干什么的，先删掉
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

3-3 useTitleHook 根据url修改浏览器标签的title

koa router文件太杂