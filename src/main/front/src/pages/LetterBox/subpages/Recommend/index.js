import React, { Component } from "react";
import {
	List,
	TextareaItem,
	NavBar,
	Button,
	Toast,
	WhiteSpace,
	Modal,
	WingBlank,
} from "antd-mobile";
import { createForm } from "rc-form";
import { connect } from "react-redux";
import Loading from "@src/components/Loading";
import { recommend } from "@src/redux/actions/letter";

const alert = Modal.alert;

class Recommend extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {}

	initialState = {};

	handleSubmit = () => {
		alert(
			"Confirm Recommend",
			"Are you confirm to recommend your conversation?",
			[
				{
					text: "Confirm",
					onPress: () => {
						let body = {};
						this.props.form.validateFields((error, value) => {
							if (error) {
								Toast.fail(
									this.props.form.getFieldError(
										Object.keys(error)[0]
									)
								);
							} else {
								body.conversationId =
									this.props.conversation.reply.conversationId;
								if (
									value != null &&
									value.description != null &&
									value.description.length != 0
								) {
									body.description = value.description;
								}

								this.handleRecommend(body);
							}
						});
					},
				},
				{ text: "Cancel", onPress: () => console.log("cancel") },
			]
		);
	};

	handleRecommend = (body) => {
		console.log(body);
		this.props.recommend(body, this.props.recommendedConversationIds);
	};

	navToBack = () => {
		this.props.history.goBack();
	};

	render() {
		const letter = this.props.conversation.letter;
		const reply = this.props.conversation.reply;
		const { getFieldProps } = this.props.form;
		const Item = List.Item;
		const recommended =
			this.props.recommendedConversationIds != null &&
			this.props.recommendedConversationIds.indexOf(
				reply.conversationId
			) > -1;

		return (
			<div>
				<NavBar
					leftContent="Back"
					mode="light"
					onLeftClick={this.navToBack}
				>
					Recommend
				</NavBar>

				{letter == null || reply == null ? (
					<div>{this.showMessage("Please try again")}</div>
				) : (
					<div>
						<List renderHeader={() => "Your conversation:"}></List>
						<List className="short content">
							<Item wrap disabled>
								<div>
									{letter.content.substring(
										0,
										letter.content.length > 200
											? 199
											: letter.content.length - 1
									) + "..."}
								</div>
							</Item>
						</List>
						<List className="short content">
							<Item wrap disabled>
								<div>
									{reply.content.substring(
										0,
										reply.content.length > 200
											? 199
											: reply.content.length - 1
									) + "..."}
								</div>
							</Item>
						</List>
					</div>
				)}

				<WhiteSpace size="lg" />

				{this.props.recommending ? (
					<div>
						<Loading message={"Recommending..."}></Loading>
					</div>
				) : (
					<div>
						{recommended ? (
							<div>
								<List
									renderHeader={() =>
										"Recommendation processing status"
									}
								></List>

								<WingBlank size="lg">
									<List className="short content">
										<Item wrap disabled>
											<div>
												The recommendation is being
												processed.
											</div>
											<div>Please wait patiently.</div>
											<div>
												You will get stamps bonus if
												your conversation is collected
												to Answer Book.
											</div>
										</Item>
									</List>
									<WhiteSpace size="lg" />
								</WingBlank>
							</div>
						) : (
							<div>
								<List renderHeader={() => "Description"}>
									<TextareaItem
										{...getFieldProps("description", {
											initialValue: "",
										})}
										rows={2}
										count={200}
										placeholder="Optional messages for better handling of recommendation."
									/>
								</List>
								<WhiteSpace size="xl" />
								<Button
									type="primary"
									onClick={this.handleSubmit}
								>
									Send
								</Button>
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
		conversation: state.letter.conversation,
		recommendedConversationIds: state.letter.recommendedConversationIds,
		recommending: state.letter.recommending,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		recommend: (body, recommendedConversationIds) =>
			dispatch(recommend(body, recommendedConversationIds)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(createForm()(Recommend));
