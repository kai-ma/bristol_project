import React, { Component } from "react";
import { Button, Toast, WhiteSpace, NavBar, List } from "antd-mobile";
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { clearLetters } from "../../redux/actions/letter";
import { loadUserInfo } from "../../redux/actions/user";
import { connect } from "react-redux";

const Item = List.Item;
class User extends Component {
	constructor(props) {
		super(props);
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
		this.props.clearLetters();
		Toast.success("Log out successfully", 1);
		setTimeout(() => {
            localStorage.clear();
			this.props.history.push("/");
		}, 1000);
	};

	componentDidMount() {
        if(this.props.reloadUserInfo){
            this.props.loadUserInfo();
        }
    }

	render() {
		const { userinfo } = this.props;
		return (
			<div>
				<NavBar mode="light">User</NavBar>
				{userinfo != null ? (
					<div>
						<List renderHeader={() => "User profile"}>
							<Item extra={userinfo.pseudonym}>pseudonym</Item>
							<Item extra={userinfo.stamp}>Stamps left</Item>
							<Item extra={userinfo.continuousLoginDays}>
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

const mapStateToProps = (state) => {
	return {
		userinfo: state.user.userinfo,
        reloadUserInfo: state.user.reloadUserInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		clearLetters: () => dispatch(clearLetters()),
        loadUserInfo : () => dispatch(loadUserInfo()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
