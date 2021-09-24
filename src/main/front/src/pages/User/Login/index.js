import React, { Component } from "react";
import {
	List,
	InputItem,
	NavBar,
	Button,
	WhiteSpace,
	Toast,
} from "antd-mobile";
import { createForm } from "rc-form";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { login } from "@src/redux/actions/user";
import { connect } from "react-redux";
import Loading from "@src/components/Loading";


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
				this.props.login(value, this.props.history);
				// this.login(value);
			}
		});
	};

	navToRegister = () => {
		this.props.history.push("/register");
	};

	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div>
				<NavBar mode="light">Login</NavBar>
				{this.props.loading ? (
					<div>
						<Loading message={"Login..."}></Loading>
					</div>
				) : (
					<div>
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
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.user.loading,
		userinfo: state.user.userinfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (value, history) => dispatch(login(value, history)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(createForm()(Login));
