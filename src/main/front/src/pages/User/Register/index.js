import React, { Component } from "react";
import {
	List,
	TextareaItem,
	InputItem,
	NavBar,
	Button,
	WhiteSpace,
	Toast,
} from "antd-mobile";
import { createForm } from "rc-form";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {}

	initialState = {};

	handleSubmit = () => {
		const input = this.props.form.getFieldsValue();
		this.props.form.validateFields((error, value) => {
			if (error) {
				Toast.info(
					this.props.form.getFieldError(Object.keys(error)[0])
				);
				return;
			} else {
				//todo 发送post请求
			}
		});
	};

	navToLogin = () => {
		this.props.history.push("/login");
	};

    async registerAsync(dispatch, rootState, payload){
        // const result = await Http({
        //   url: '/user/register',
        //   body: payload
        // });
        // if(result){
        //   // cookie.set('user', result);
        //   localStorage.setItem('token', result.token);
        //   localStorage.setItem('username', result.username);
        //   Toast.success('注册成功');
        // }
      }

	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div>
				<NavBar mode="light">Register</NavBar>
				<List renderHeader={() => ""}>
					<InputItem
						{...getFieldProps("name", {
							rules: [{ required: true }],
						})}
						labelNumber={6}
						placeholder="username"
					>
						UserName
					</InputItem>

					<InputItem
						{...getFieldProps("email", {
							rules: [{ required: true }],
						})}
						labelNumber={6}
						placeholder="email"
					>
						Email
					</InputItem>
					<InputItem
						{...getFieldProps("password", {
							rules: [{ required: true }],
						})}
						placeholder="password"
						labelNumber={6}
					>
						Password
					</InputItem>
                    {/* <InputItem
						{...getFieldProps("password", {
							rules: [{ required: true }],
						})}
						placeholder="confirm password"
						labelNumber={6}
					>
						Confirm
					</InputItem> */}
				</List>
                <WhiteSpace size="xl" />
				<Button
					type="primary"
					onClick={this.handleSubmit}
					icon={<FaUserPlus />}
				>
					Register
				</Button>
                <List renderHeader={() => "Have account? Go to login"}></List>
				<Button
					type="primary"
					onClick={this.navToLogin}
					icon={<FaSignInAlt />}
				>
					Login
				</Button>
			</div>
		);
	}
}

export default createForm()(Register);
