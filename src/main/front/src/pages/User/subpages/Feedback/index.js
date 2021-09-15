import React, { Component } from "react";
import {
	List,
	TextareaItem,
	NavBar,
	Button,
	Toast,
	WhiteSpace,
	WingBlank,
	Slider,
} from "antd-mobile";
import { createForm } from "rc-form";
import Loading from "@src/components/Loading";
import "./index.css";
import Http from "@src/utils/http.js";

class Feedback extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {}

	initialState = {
		sending: false,
		score1: 5,
		score2: 5,
		marks: {
			1: "1",
			2: "2",
			3: "3",
			4: "4",
			5: "5",
			6: "6",
			7: "7",
			8: "8",
			9: "9",
			10: "10",
		},
	};

	handleSubmit = () => {
		this.props.form.validateFields((error, value) => {
			if (error) {
				Toast.fail(
					this.props.form.getFieldError(Object.keys(error)[0])
				);
			} else {
				this.setState({
					sending: true,
				});
				let body = {};
				body.score1 = this.state.score1;
				body.score2 = this.state.score2;
				if (
					value != null &&
					value.comment != null &&
					value.comment.length != 0
				) {
					body.comment = value.comment;
				}
				console.log(body);
				Http({
					url: "/user/feedback",
					body: body,
					mock: false,
				}).then(
					(res) => {
						this.setState({
							sending: false,
						});
						Toast.success("feedback successfully", 2, () => {
							this.props.history.goBack();
						});
					},
					(err) => {
						this.setState({
							sending: false,
						});
						//已经举报过
						if (err.errCode != null) {
							Toast.fail(err.errMsg, 2, () => {
								this.props.history.goBack();
							});
						}
					}
				);
			}
		});
	};

	navToBack = () => {
		this.props.history.goBack();
	};

	render() {
		const { getFieldProps } = this.props.form;

		return (
			<div>
				<NavBar
					leftContent="Back"
					mode="light"
					onLeftClick={this.navToBack}
				>
					Feedback
				</NavBar>

				{this.state.sending ? (
					<div>
						<Loading message={"Sending the feedback..."}></Loading>
					</div>
				) : (
					<div className="am-slider-example">
						<WingBlank size="lg">
							<p className="sub-title">
								How would you rate the overall user interface?
							</p>
							<Slider
								style={{ marginLeft: 30, marginRight: 30 }}
								defaultValue={5}
								min={1}
								max={10}
								dots={true}
								step={1}
								marks={this.state.marks}
								onChange={(value) => {
									this.setState({
										score1: value,
									});
								}}
							/>
						</WingBlank>

						<WhiteSpace size="xl" />

						<WingBlank size="lg">
							<p className="sub-title">
								How many points will you award to the app?
							</p>
							<Slider
								style={{ marginLeft: 30, marginRight: 30 }}
								defaultValue={5}
								min={1}
								max={10}
								dots={true}
								step={1}
								marks={this.state.marks}
								onChange={(value) => {
									this.setState({
										score2: value,
									});
								}}
							/>
						</WingBlank>

						<WhiteSpace size="xl" />
						<List renderHeader={() => "Comment"}>
							<TextareaItem
								{...getFieldProps("comment", {
									initialValue: "",
								})}
								rows={4}
								count={1000}
								placeholder="Please share your comments and suggestions with us to help make our application better!"
							/>
						</List>

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

export default createForm()(Feedback);
