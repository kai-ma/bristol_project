import React, { Component } from "react";
import {
	List,
	TextareaItem,
	InputItem,
	NavBar,
	Button,
	WhiteSpace,
	Toast,
	Picker,
    Modal,
} from "antd-mobile";
import { createForm } from "rc-form";
import Http from "@src/utils/http.js";

const alert = Modal.alert;
class Send extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
		let key = "topic";
		let topicString = localStorage.getItem(key);
		if (topicString == null) {
			Http({
				url: "/answerbook/get/topic",
				method: "get",
				mock: false,
			}).then(
				(res) => {
					let topicString = JSON.stringify(res);
					localStorage.setItem(key, topicString);
                    this.convertTopic(res);
				},
				(err) => {
					Toast.info("Network error, please try again", 2);
				}
			);
		} else {
			this.convertTopic(JSON.parse(topicString));
		}
	}

	convertTopic = (topicArray) => {
		let topics = [];
		for (var i = 0; i < topicArray.length; i++) {
			topics[i] = {
				label: topicArray[i].text,
				value: topicArray[i].id,
			};
		}
		this.setState({
			topics: topics,
		});
	};

	initialState = {
		topics: [],
	};

	handleSubmit = () => {
		this.props.form.validateFields((error, value) => {
			if (error) {
				Toast.info(
					this.props.form.getFieldError(Object.keys(error)[0])
				);
				return;
			} else {
                alert("Confirm send this letter", "Cost 1 stamp to send a letter", [
                    {
                        text: "Confirm",
                        onPress: () => {this.sendLetter(value)}
                    },
                    { text: "Cancel" , onPress: () => console.log('cancel')},
                ]);
			}
		});
	};

    sendLetter = (value) => {
        Http({
            url: "/letter/send/first",
            body: { ...value, topicId: value.topic[0] },
            mock: false,
        }).then(
            (res) => {
                Toast.info("Send successfully!", 2);
                setTimeout(() => {
                    this.props.history.push("/");
                }, 2000);
            },
            (err) => {
                Toast.fail(err.errMsg, 2);
            }
        );
    }

	linkToHome = () => {
		this.props.history.push("/");
	};

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
				<List renderHeader={() => "Title"}>
					<InputItem
						{...getFieldProps("title", {
							rules: [{ required: true }],
						})}
						clear
						placeholder="Title of your letter"
					></InputItem>
				</List>
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
				<List renderHeader={() => "Topic"}></List>
				<Picker
					title={"Topic"}
					extra="Please select"
					data={this.state.topics}
					// value={this.state.topic}
					cols={1}
					okText="Confirm"
					dismissText="Cancel"
					{...getFieldProps("topic")}
					className="forss"
				>
					<List.Item arrow="horizontal">Topic</List.Item>
				</Picker>
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
