import React, { Component } from "react";
import {
	List,
	TextareaItem,
	InputItem,
	NavBar,
	Button,
	Switch,
	Toast,
} from "antd-mobile";
import { createForm } from "rc-form";

class Send extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {}

	initialState = {};

	handleSubmit = () => {
		const input = this.props.form.getFieldsValue();
		console.log(input);
		this.props.form.validateFields((error, value) => {
			if (error) {
                // if(input.content == null || input.content == ""){
                //     Toast.fail("Content should not be empty");
                // }
                Toast.fail("Please input all the ");
				return;
			} else {
                //发送post请求
				console.log(value);
			}
		});
	};

    linkToHome = () => {
        this.props.history.push("/");
    }

	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div>
				<NavBar
					leftContent="Home"
					mode="light"
					onLeftClick={this.linkToHome}
				>
					Send a letter
				</NavBar>
				<List renderHeader={() => "Content"}>
					<TextareaItem
						{...getFieldProps("content", {
							initialValue: "",
							rules: [{ required: true }],
						})}
						rows={10}
						count={1000}
                        placeholder="It is suggested that key people and places use pseudonyms."
					/>
				</List>
				<List renderHeader={() => "Topic"}>
					<InputItem
						{...getFieldProps("inputclear", {
							rules: [{ required: true }],
						})}
						clear
						placeholder="Topic of your letter"
					></InputItem>
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
				{/* 这个应该放到reply里面 */}
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
                {/* 空行 */}
                <List
					renderHeader={() => ""}
				></List>
				<Button type="primary" onClick={this.handleSubmit}>
					Send
				</Button>
                
			</div>
		);
	}
}

export default createForm()(Send);

//todo:焦点是干什么的
