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

class Reply extends Component {
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
				Toast.fail("Please check your input, some input missing");
				return;
			} else {
				//发送post请求
				// console.log(value);
			}
		});
	};

	linkToHome = () => {
		this.props.history.push("/");
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
					leftContent="Home"
					mode="light"
					onLeftClick={this.linkToHome}
				>
					Reply
				</NavBar>

				{letter == null ? (
					<div>{this.showMessage("Please try again")}</div>
				) : (
					<div>
						<List className="short content">
							<Item wrap disabled>
								<div>
									{letter.content.substring(
										0,
										letter.content.length > 100
											? 99
											: letter.content.length - 1
									) + "..."}
								</div>
							</Item>
						</List>
					</div>
				)}

				<WhiteSpace size="lg" />

				<List renderHeader={() => "Content"}>
					<TextareaItem
						{...getFieldProps("content", {
							initialValue: "",
							rules: [{ required: true }],
						})}
						rows={8}
						count={1000}
						placeholder="Give advice or warmth to strangers"
					/>
				</List>
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
				<List renderHeader={() => ""}></List>
				<Button type="primary" onClick={this.handleSubmit}>
					Reply
				</Button>
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
)(createForm()(Reply));
