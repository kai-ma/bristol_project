import React, { Component } from "react";
import { NavBar, WingBlank, Button } from "antd-mobile";
import { withRouter } from "react-router-dom";
import Loading from "@src/components/Loading";
import LetterContent from "@src/components/LetterContent";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
//todo: 点赞放到conversation中，由后端返回  不然多个conversation之间的点赞会混乱
class Conversation extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
		const topicId = this.props.location.state.topicId;
		const conversationId = this.props.location.state.conversationId;
		let key = "content_" + topicId;
		let contentString = localStorage.getItem(key);
		if (contentString != null) {
			let conversations = JSON.parse(contentString);
			const conversation = conversations.find(
				(x) => x.id == conversationId
			);
			this.setState({
				letters: conversation.letterVOList,
				loading: false,
			});
		}
	}

	linkToLetterBox = () => {
		this.props.history.goBack();
	};

	initialState = { conversation: [], loading: true, like: false };

    handleClick = (conversation) => {
		this.setState({
			like: !this.state.like,
		});
	};

	render() {
		const conversation = this.state.conversation == null ? [] : this.state.conversation;
        const like = this.state.like;
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
					{this.state.loading ? (
						<div>
							<Loading></Loading>
						</div>
					) : (
						<div>
							{this.state.letters.map((letter, index) => (
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
											like === true ? (
												<AiOutlineLike />
											) : (
												<AiFillLike />
											)
										}
										inline
										size="large"
										style={{
											marginRight: "2px",
										}}
										onClick={() =>
											this.handleClick(conversation)
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
