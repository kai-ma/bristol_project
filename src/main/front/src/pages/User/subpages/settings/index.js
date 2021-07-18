import React, { Component } from "react";
import {
	List,
	TextareaItem,
	InputItem,
	NavBar,
	Button,
	Switch,
	Toast,
    WhiteSpace,
} from "antd-mobile";
import { createForm } from "rc-form";
import { connect } from "react-redux";

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {}

	initialState = {};

	handleSubmit = () => {
		const input = this.props.form.getFieldsValue();
		// console.log(input);
		this.props.form.validateFields((error, value) => {
			if (error) {
				Toast.info(this.props.form.getFieldError(Object.keys(error)[0]));
				return;
			} else {
				//发送post请求
				// console.log(value);
			}
		});
	};


    linkToBack = () => {
		this.props.history.goBack();
	};

	render() {
		const letter = this.props.letters.find(
			(x) => x.id == this.props.match.params.id
		);
		const { getFieldProps } = this.props.form;
		const Item = List.Item;
		return (
			<div>
				<NavBar
					leftContent="Back"
					mode="light"
					onLeftClick={this.linkToBack}
				>
					Settings
				</NavBar>

                <List renderHeader={() => "Sign a pseudonym"}>
					<InputItem
						{...getFieldProps("name", {
							rules: [{ required: true }],
						})}
						clear
						placeholder="Please enter a pseudonym"
					></InputItem>
				</List>
				<List
					renderHeader={() => "Allow to be collected to answerbook"}
				>
					<List.Item
						extra={
							<Switch
								{...getFieldProps("allowBeCollected", {
									initialValue: true,
									valuePropName: "checked",
									rules: [{ required: true }],
								})}
								platform="ios"
							/>
						}
					>
						Get bonus if be collected
					</List.Item>
				</List>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		letters: state.letter.letters,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(createForm()(Settings));
