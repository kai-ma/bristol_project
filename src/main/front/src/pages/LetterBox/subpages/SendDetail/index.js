import React, { Component } from "react";
import { NavBar, Toast, WhiteSpace, Card, WingBlank, List } from "antd-mobile";
import { connect } from "react-redux";
import LetterContent from "@src/components/LetterContent";
import Http from "@src/utils/http.js";
import { prepareReplyToMe } from "@src/redux/actions/letter";

class SendDetail extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
		const matchedLetter = this.props.myFirstLetters.find(
			(x) => x.id == this.props.match.params.id
		);
		if (matchedLetter != null) {
			const firstLetterId = matchedLetter.id;
			// this.props.loadConversationByTopicId(this.props.match.params.id);
			//从localStorage中获取content，如果获取不到，发送http请求，获取content。
			let key = "replies_" + firstLetterId;
			let repliesString = localStorage.getItem(key);
			if (repliesString == null) {
				Http({
					url:
						"/letter/letterbox/replies/firstLetterId?firstLetterId=" +
						firstLetterId,
					method: "get",
					mock: false,
				}).then(
					(res) => {
						//需要JSON.stringify，不然会存入[Object,Object]
						if (res != null && res.length > 0) {
							let repliesString = JSON.stringify(res);
							localStorage.setItem(key, repliesString);
							this.setState({
								replies: res,
							});
						}
					},
					(err) => {
						Toast.fail(err.errMsg, 1);
					}
				);
			} else {
				let replies = JSON.parse(repliesString);
				this.setState({
					replies: replies,
				});
			}
		} else {
			this.showMessage("Error url, please input correct url");
		}
	}

	initialState = {
		replies: [],
	};

	linkToBack = () => {
		this.props.history.goBack();
	};

	showMessage = (message) => {
		Toast.fail(message);
	};

	showReplyToMe = (letter, reply) => {
		this.props.prepareReplyToMe({letter: letter, reply: reply});
		this.props.history.push("/letterbox/replytome");
	};

	render() {
		const letter = this.props.myFirstLetters.find(
			(x) => x.id == this.props.match.params.id
		);
		const replies = this.state.replies;
		return (
			<div>
				<NavBar
					leftContent="Back"
					mode="light"
					onLeftClick={this.linkToBack}
				>
					Replies
				</NavBar>

				{letter == null ? (
					<div>
						{this.showMessage(
							"Error url, please input correct url"
						)}
					</div>
				) : (
					<div>
						<LetterContent letter={letter}></LetterContent>
						<div>
							{replies == null || replies.length == 0 ? (
								<div>
									<List
										renderHeader={() => "No replies."}
									></List>
								</div>
							) : (
								<div>
									<List
										renderHeader={() =>
											replies.length == 1
												? "1 Reply : "
												: replies.length + " replies: "
										}
									></List>
								</div>
							)}

							{replies.map((reply, index) => (
								<div key={index}>
									<WingBlank size="lg">
										<WhiteSpace size="lg" />
										<Card
											onClick={() =>
												this.showReplyToMe(letter, reply)
											}
										>
											{reply.title != null ? (
												<Card.Header
													title={reply.title}
												/>
											) : null}
											<Card.Body>
												{reply.content.substring(
													0,
													reply.content.length > 100
														? 99
														: reply.content
																.length - 1
												) + "..."}
											</Card.Body>
											<Card.Footer
												content={
													<div>
														{reply.createdAt}
													</div>
												}
												extra={
													<div>
														{reply.pseudonym}
													</div>
												}
											/>
										</Card>
										<WhiteSpace size="lg" />
									</WingBlank>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myFirstLetters: state.letter.myFirstLetters,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		prepareReplyToMe: (conversation) => dispatch(prepareReplyToMe(conversation)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SendDetail);
