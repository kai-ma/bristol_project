import React, { Component } from "react";
import {
	List,
	InputItem,
	NavBar,
	Button,
	WhiteSpace,
	Toast,
	Modal,
} from "antd-mobile";
import { createForm } from "rc-form";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Http from "@src/utils/http.js";

const alert = Modal.alert;

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
		// 如果成功 const router = this.props.match.params.router;
	}

	initialState = {};

	handleLogin = () => {
		this.props.form.validateFields((error, value) => {
			if (error) {
				Toast.fail(
					this.props.form.getFieldError(Object.keys(error)[0])
				);
				return;
			} else {
				this.login(value);
			}
		});
	};

	login = (value) => {
		Http({
			url: "/auth/login",
			body: value,
			mock: false,
		}).then(
			(res) => {
				alert("Login successfully", "Stamp bonus:1", [
					{ text: "Ok", onPress: this.navToHome },
				]);
				localStorage.setItem("token", res.token);
			},
			(err) => {
				Toast.fail(err.errMsg, 2);
			}
		);
	};

	navToHome = () => {
		this.props.history.push("/");
	};

	navToRegister = () => {
		this.props.history.push("/register");
	};

	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div>
				<NavBar mode="light">Login</NavBar>
				<WhiteSpace size="xl" />
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
					labelNumber={6}
					type="password"
					placeholder="********"
				>
					Password
				</InputItem>
				<WhiteSpace size="xl" />
				<Button
					type="primary"
					onClick={this.handleLogin}
					icon={<FaSignInAlt />}
				>
					Login
				</Button>
				<WhiteSpace size="xl" />
				<List renderHeader={() => "Not registered yet?"}></List>
				<Button
					type="primary"
					onClick={this.navToRegister}
					icon={<FaUserPlus />}
				>
					Register
				</Button>
			</div>
		);
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		user: state.user.user,
// 		loading: state.user.loading,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		login: (value, history) => dispatch(login(value, history)),
// 	};
// };

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(createForm()(Login));
export default createForm()(Login);

//可以把title换成icon
