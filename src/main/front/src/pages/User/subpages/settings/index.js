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
import { AiOutlineSave } from "react-icons/ai";
import { loadUserInfo, updateUserSettings } from "@src/redux/actions/user";
import { connect } from "react-redux";

const alert = Modal.alert;

class Settings extends Component {
	constructor(props) {
		super(props);
	}

	initialState = {};

	save = () => {
		const userinfo = this.props.userinfo;
		this.props.form.validateFields((error, value) => {
			if (error) {
				Toast.info(
					this.props.form.getFieldError(Object.keys(error)[0])
				);
				return;
			} else {
				//发送post请求
				if (
					value.pseudonym !== userinfo.pseudonym ||
					value.allowCollect !== userinfo.allowCollect
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
        let userinfo = this.props.userinfo;
		let settings = {};
		if (value.pseudonym !== userinfo.pseudonym) {
			settings.pseudonym = value.pseudonym;
		}
		if (value.allowCollect !== userinfo.allowCollect) {
			settings.allowCollect = value.allowCollect;
		}
        this.props.updateUserSettings(userinfo, settings, this.props.history);
	};

	linkToBack = () => {
		this.props.history.goBack();
	};

	componentDidMount() {
        if(this.props.reloadUserInfo){
            this.props.loadUserInfo();
        }
    }

	render() {
		const { userinfo } = this.props;

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
						defaultValue={userinfo.pseudonym}
						placeholder="Change pseudonym"
						{...getFieldProps("pseudonym", {
							initialValue: userinfo.pseudonym,
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
									initialValue: userinfo.allowCollect,
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


const mapStateToProps = (state) => {
	return {
		userinfo: state.user.userinfo,
        reloadUserInfo: state.user.reloadUserInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
        loadUserInfo : () => dispatch(loadUserInfo()),
        updateUserSettings: (userinfo, settings, history) => dispatch(updateUserSettings(userinfo, settings, history)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Settings));