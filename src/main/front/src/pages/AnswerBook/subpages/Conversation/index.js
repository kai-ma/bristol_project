import React, { Component } from "react";
import { NavBar, WingBlank, Button, Toast } from "antd-mobile";
import { withRouter } from "react-router-dom";
import Loading from "@src/components/Loading";
import LetterContent from "@src/components/LetterContent";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import Http from "@src/utils/http.js";
class Conversation extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
		let conversationId = this.props.location.state.conversationId;
		let content = this.getContentFromLocalStorage();
		let conversations = content.conversations;
		if (conversations != null) {
			let index = conversations.findIndex(
				(x) => x.id == conversationId
			);
			let conversation = conversations[index];
			this.setState({
				conversation: conversation,
			});
		}
	}

	getContentFromLocalStorage = () => {
		let topicId = this.props.location.state.topicId;
		let key = "content_" + topicId;
		let contentString = localStorage.getItem(key);
		if (contentString != null) {
			return JSON.parse(contentString);
		}
	};

	linkToLetterBox = () => {
		this.props.history.goBack();
	};

	initialState = { conversation: [] };

	likeOperation = (conversation) => {
		Http({
			url: conversation.like
				? "/answerbook/cancel_like"
				: "/answerbook/like",
			body: { conversationId: conversation.id },
			mock: false,
		}).then(
			(res) => {
				console.log("operation successfully");
				conversation.like = !conversation.like;
				this.setState({
					conversation: conversation,
				});
				this.updateLocalStorage(conversation);
			},
			(err) => {}
		);
	};

	//需要修改到localStorage中，或者用redux，不然刷新之后点赞又没了
	updateLocalStorage = (conversation) => {
		let conversationId = this.props.location.state.conversationId;
		let content = this.getContentFromLocalStorage();
		let conversations = content.conversations;

		let index = conversations.findIndex((x) => x.id == conversationId);
		conversations[index] = conversation;
        let topicId = this.props.location.state.topicId;
        let key = "content_" + topicId;
		let contentString = JSON.stringify(content);
		localStorage.setItem(key, contentString);
	};

	render() {
		const conversation = this.state.conversation;
		console.log(conversation);
		return (
			<div>
				<NavBar
					leftContent="Back"
					mode="light"
					onLeftClick={this.linkToLetterBox}
				>
					Conversation
				</NavBar>
				<div>
					{conversation == null || conversation.length === 0 ? (
						<div>
							<Loading></Loading>
						</div>
					) : (
						<div>
							{conversation.letterVOList.map((letter, index) => (
								<div key={index}>
									<LetterContent
										letter={letter}
									></LetterContent>
								</div>
							))}
							<div>
								<WingBlank>
									<Button
										icon={
											conversation.like ? (
												<AiFillLike />
											) : (
												<AiOutlineLike />
											)
										}
										inline
										size="large"
										style={{
											marginRight: "2px",
										}}
										onClick={() =>
											this.likeOperation(conversation)
										}
									>
										Like
									</Button>
								</WingBlank>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default withRouter(Conversation);
