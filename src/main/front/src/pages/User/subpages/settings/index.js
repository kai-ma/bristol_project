import React, { Component } from "react";
import {
	List,
	InputItem,
	NavBar,
	Switch,
	Toast,
	Button,
	Modal,
} from "antd-mobile";
import { createForm } from "rc-form";
import { getObjectFromLocalStorage, setObjectToLocalStorage } from "@src/utils";
import { AiOutlineSave } from "react-icons/ai";
import Http from "@src/utils/http.js";

const alert = Modal.alert;

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {};

	save = () => {
		const user = this.state.user;
		this.props.form.validateFields((error, value) => {
			if (error) {
				Toast.info(
					this.props.form.getFieldError(Object.keys(error)[0])
				);
				return;
			} else {
				//发送post请求
				if (
					value.pseudonym !== user.pseudonym ||
					value.allowCollect !== user.allowCollect
				) {
					alert("Confirm change settings", "Are you confirm to change?", [
						{
							text: "Confirm",
							// onPress: this.changeSettings(value),
                            onPress: () => {this.changeSettings(value)}
						},
						{ text: "Cancel" , onPress: () => console.log('cancel')},
					]);
				}
			}
		});
	};

	changeSettings = (value) => {
        let user = this.state.user;
		let settings = {};
		if (value.pseudonym !== user.pseudonym) {
			settings.pseudonym = value.pseudonym;
		}
		if (value.allowCollect !== user.allowCollect) {
			settings.allowCollect = value.allowCollect;
		}
		Http({
			url: "/user/settings",
			body: settings,
			mock: false,
		}).then(
			(res) => {
				Toast.info("change settings successfully", 2, () => this.props.history.push("/user"));
                //成功修改 更新state 和 localStorage
                if(settings.pseudonym != null){
                    user.pseudonym = settings.pseudonym;
                }
                if(settings.allowCollect != null){
                    user.allowCollect = settings.allowCollect;
                }
                // this.setState({user: user});
                setObjectToLocalStorage("user", user);
                
			},
			(err) => {
				Toast.fail(err.errMsg, 2);
			}
		);
	};

	linkToBack = () => {
		this.props.history.goBack();
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
		const { getFieldProps } = this.props.form;
		return (
			<div>
				<NavBar
					leftContent="Back"
					mode="light"
					onLeftClick={this.linkToBack}
				>
					Settings
				</NavBar>

				<List renderHeader={() => "Change pseudonym"}>
					<InputItem
						// clear
						defaultValue={user.pseudonym}
						placeholder="Change pseudonym"
						{...getFieldProps("pseudonym", {
							initialValue: user.pseudonym,
							rules: [{ required: true }],
						})}
						labelNumber={7}
					>
						Pseudonym
					</InputItem>
				</List>

				<List
					renderHeader={() =>
						"Allow your replies to be collected to answerbook"
					}
				>
					<List.Item
						extra={
							<Switch
								{...getFieldProps("allowCollect", {
									initialValue: user.allowCollect,
									valuePropName: "checked",
									rules: [{ required: true }],
								})}
								platform="ios"
							/>
						}
					>
						Allow to be collected
					</List.Item>
				</List>
				<List renderHeader={() => ""}>
					<Button
						type="primary"
						onClick={this.save}
						icon={<AiOutlineSave />}
					>
						Save changes
					</Button>
				</List>
			</div>
		);
	}
}

export default createForm()(Settings);
