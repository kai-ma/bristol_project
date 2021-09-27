import React, { Component } from "react";
import { List, NavBar, Toast, WhiteSpace, WingBlank } from "antd-mobile";
import Loading from "@src/components/Loading";
import "./index.css";
import Http from "@src/utils/http.js";
import { connect } from "react-redux";
import { getObjectFromLocalStorage, setObjectToLocalStorage } from "@src/utils";

const Item = List.Item;
class Stamp extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {}

	initialState = {
		loading: false,
		bonus: [],
	};

	navToBack = () => {
		this.props.history.goBack();
	};

	componentDidMount() {
		//获取我的replies
		let key = "bonus_history";
		let bonus = getObjectFromLocalStorage(key);
		if (bonus != null) {
			this.setState({ bonus: bonus });
		} else {
			this.setState({ loading: true });
			Http({
				url: "/user/bonus",
				method: "get",
				mock: false,
			}).then(
				(res) => {
					setObjectToLocalStorage(key, res);
					this.setState({ bonus: res, loading: false });
				},
				(err) => {
					this.setState({ loading: false });
					Toast.fail("Network error.");
				}
			);
		}
	}

	render() {
		const bonus = this.state.bonus;
		return (
			<div>
				<NavBar
					leftContent="Back"
					mode="light"
					onLeftClick={this.navToBack}
				>
					Rewards history
				</NavBar>

				{this.state.loading ? (
					<div>
						<Loading message={"loading..."}></Loading>
					</div>
				) : (
					<div>
						{bonus == null || bonus <= 0 ? (
							<div></div>
						) : (
							<div>
								<WhiteSpace />
								<p className="p">
									Rewards for daily continuous login
								</p>
								<WingBlank size="lg">
									<List>
										{bonus.map((item, key) => (
											<Item extra={"+ " + item.bonus}>
												{item.createdAt.substring(
													0,
													10
												)}
											</Item>
										))}
									</List>
								</WingBlank>
								<WhiteSpace />
								<WhiteSpace />
								<p className="p">
									Rewards for high-quality replies
								</p>
								<WingBlank size="lg">
									<List>
										<Item extra={"+ " + 2}>
											{"2021-09-05 14:55"}
										</Item>
										<Item extra={"+ " + 2}>
											{"2021-09-04 12:48"}
										</Item>
									</List>
								</WingBlank>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userinfo: state.user.userinfo,
	};
};

export default connect(mapStateToProps)(Stamp);
