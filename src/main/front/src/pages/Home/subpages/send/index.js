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
import { send } from "@src/redux/actions/letter";
import { connect } from "react-redux";
import Loading from "@src/components/Loading";

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
				alert(
					"Confirm send this letter",
					"Cost 1 stamp to send a letter",
					[
						{
							text: "Confirm",
							onPress: () => {
								this.props.send(value, this.props.history);
							},
						},
						{
							text: "Cancel",
							onPress: () => console.log("cancel"),
						},
					]
				);
			}
		});
	};

	linkToHome = () => {
		this.props.history.push("/");
	};

	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div>
				<div>
					<NavBar
						leftContent="Home"
						mode="light"
						onLeftClick={this.linkToHome}
					>
						Send a letter
					</NavBar>
				</div>

				{this.props.loading ? (
					<div>
						<Loading message={"Sending..."}></Loading>
					</div>
				) : (
					<div>
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
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.letter.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		send: (value, history) => dispatch(send(value, history)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(createForm()(Send));
