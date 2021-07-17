import React, { Component } from "react";
import { Button, List, Toast, WhiteSpace, InputItem, NavBar } from "antd-mobile";
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { isLogin } from "@src/utils";

export default class User extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	navToLogin = () => {
		this.props.history.push("/login");
	};

	navToRegister = () => {
		this.props.history.push("/register");
	};

	handleLogOut = () => {
		localStorage.removeItem("token");
		Toast.success("Log out successfully", 1);
		setTimeout(() => {
			this.props.history.push("/");
		}, 1000);
	};

	render() {
		return (
			<div>
				{isLogin() ? (
					<div>
						<NavBar mode="light">User</NavBar>
						<h2>Stamps left: 10</h2>
						<Button
							type="warning"
							onClick={this.handleLogOut}
							icon={<FaSignOutAlt />}
						>
							Log Out
						</Button>
					</div>
				) : (
					<div>
						<WhiteSpace size="xl" />
						<Button
							type="primary"
							onClick={this.navToLogin}
							icon={<FaSignInAlt />}
						>
							Log in
						</Button>
						<WhiteSpace size="xl" />
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
