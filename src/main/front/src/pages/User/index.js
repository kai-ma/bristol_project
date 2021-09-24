import React, { Component } from "react";
import { Button, Toast, WhiteSpace, NavBar, List } from "antd-mobile";
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { RiFeedbackLine } from "react-icons/ri";
import { clearLetters } from "../../redux/actions/letter";
import { clearAnswerbooks } from "../../redux/actions/answerbook";
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

	navtoFeedBack = () => {
		this.props.history.push("/feedback");
	};

	handleLogOut = () => {
		this.props.clearLetters();
		Toast.success("Log out successfully", 1, () => {
			localStorage.clear();
			this.props.history.push("/");
		});
	};

	componentDidMount() {
		if (this.props.reloadUserInfo) {
			this.props.loadUserInfo();
		}
	}

	render() {
		const { userinfo } = this.props;
        const Brief = Item.Brief;
		return (
			<div>
				<NavBar mode="light">User</NavBar>
				{userinfo != null ? (
					<div>
						<List renderHeader={() => "User profile"}>
							<Item extra={userinfo.pseudonym}>pseudonym</Item>
                            <Item extra={userinfo.continuousLoginDays}>
								Consecutive login days
							</Item>
                            <Item
								arrow="horizontal"
								multipleLine
								onClick={() => {
                                    this.props.history.push("/stamp");
                                }}
							>
								Stamp rewards <Brief>{"Remaining stamps: " + userinfo.stamp }</Brief>
							</Item>
						</List>
						<List renderHeader={() => ""}>
							<Button
								onClick={this.navToSettings}
								icon={<AiOutlineSetting />}
							>
								Settings
							</Button>
						</List>
						<List renderHeader={() => ""}>
							<Button
								type="primary"
								onClick={this.navtoFeedBack}
								icon={<RiFeedbackLine />}
							>
								Feedback
							</Button>
						</List>
						<List renderHeader={() => ""}>
							<Button
								type="warning"
								onClick={this.handleLogOut}
								icon={<FaSignOutAlt />}
							>
								Log Out
							</Button>
						</List>
						<WhiteSpace />
						<p className="p" onClick={this.navToAnswerBook}>
							{/* {"Tomorrow login reward: " + userinfo.bonusTomorrow + " stamps"} */}
							{"The reward for tomorrow's login: " +
								userinfo.bonusTomorrow +
								" stamps"}
						</p>
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
		clearAnswerbooks: () => dispatch(clearAnswerbooks()),
		loadUserInfo: () => dispatch(loadUserInfo()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
