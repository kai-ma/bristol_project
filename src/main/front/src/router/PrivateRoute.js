import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils";
import { Toast } from "antd-mobile";

const PrivateRoute = ({ component: Component, ...props }) => {
	// 解构赋值 将 props 里面的 pros 赋值给 Component
	return (
		<Route
			{...props}
			render={(props) => {
				if (isLogin()) {
					// 如果登录了, 返回正确的路由
					return <Component {...props} />;
				} else {
					// 没有登录就重定向至登录页面  可以调整下面的if判断，只让部分页面显示提示信息
					// if (props.location.pathname != "/login" && props.location.pathname != "/user") {
					// 	Toast.offline("Please login to see the content", 1);
					// }
					return (
						<Redirect
							to={{
								pathname: "/login",
								state: {
									from: props.location.pathname,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};

export default PrivateRoute;

//参考：https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
//参考：https://www.jianshu.com/p/ad7e6ec86ba7  这里需要稍微改一下
