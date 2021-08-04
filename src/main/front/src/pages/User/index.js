import React, { Component } from "react";
import { Button, Toast, WhiteSpace, NavBar, List } from "antd-mobile";
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";

import { getObjectFromLocalStorage } from "@src/utils";

const Item = List.Item;
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

	navToSettings = () => {
		this.props.history.push("/settings");
	};

	handleLogOut = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		Toast.success("Log out successfully", 1);
		setTimeout(() => {
			this.props.history.push("/");
		}, 1000);
	};

	componentDidMount() {
		let user = getObjectFromLocalStorage("user");
		if (user != null) {
			this.setState({ user: user });
		}
	}

	initialState = {
		user: [],
	};

	render() {
		const { user } = this.state;
		return (
			<div>
				{user != null ? (
					<div>
						<NavBar mode="light">User</NavBar>
						<List renderHeader={() => "User profile"}>
							<Item extra={user.pseudonym}>pseudonym</Item>
							<Item extra={user.stamp}>Stamps left</Item>
							<Item extra={user.continuousLoginDays}>
								Consecutive login days
							</Item>
						</List>
						<List renderHeader={() => "Settings"}>
							<Button
								type="primary"
								onClick={this.navToSettings}
								icon={<AiOutlineSetting />}
							>
								Settings
							</Button>
						</List>
						<List renderHeader={() => "Log out"}>
							<Button
								type="warning"
								onClick={this.handleLogOut}
								icon={<FaSignOutAlt />}
							>
								Log Out
							</Button>
						</List>
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
