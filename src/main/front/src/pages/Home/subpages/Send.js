import React, { Component } from "react";
import {
	List,
	TextareaItem,
	InputItem,
	NavBar,
	Button,
	WhiteSpace,
	Toast,
} from "antd-mobile";
import { createForm } from "rc-form";
import Http from "@src/utils/http.js";

class Send extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {}

	initialState = {};

	handleSubmit = () => {
		const input = this.props.form.getFieldsValue();
		this.props.form.validateFields((error, value) => {
			if (error) {
                Toast.info(this.props.form.getFieldError(Object.keys(error)[0]));
				return;
			} else {
                //发送post请求
				Http({ url: "/letter/send/first", body: value, mock:false }).then(
                    (res) => {
                        Toast.info("Send successfully!", 2);
                        setTimeout(() =>{
                            this.props.history.push("/");
                        }, 2000);
                    },
                    (err) => {
                        
                    }
                );
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
				<List renderHeader={() => "Title"}>
					<InputItem
						{...getFieldProps("title", {
							rules: [{ required: true }],
						})}
						clear
						placeholder="Title of your letter"
					></InputItem>
				</List>
				{/* <List renderHeader={() => "Sign a pseudonym"}>
					<InputItem
						{...getFieldProps("name", {
							rules: [{ required: true }],
						})}
						clear
						placeholder="Please enter a pseudonym"
					></InputItem>
				</List> */}
                <WhiteSpace size="xl" />
				<Button type="primary" onClick={this.handleSubmit}>
					Send
				</Button>
			</div>
		);
	}
}

export default createForm()(Send);

//todo:所有表单都有这个问题，校验需要更严谨，提示应该更详细。怎么遍历所有检查某一项是不是空呢？
//需要继续学习的地方:焦点是干什么的
