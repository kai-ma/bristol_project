import React, { Component } from "react";
import { NavBar, Toast, WhiteSpace } from "antd-mobile";
import { connect } from "react-redux";
import LetterContent from "@src/components/LetterContent";
import Http from "@src/utils/http.js";
    
class ReplyDetail extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
		const matchedLetter = this.props.firstLettersIReplied.find(
			(x) => x.id == this.props.match.params.id
		);
		if (matchedLetter != null) {
			const conversationId = matchedLetter.conversationId;
			//从localStorage中获取conversation的剩余回信，如果获取不到，发送http请求，获取content。
			let key = "con_replies_" + conversationId;
			let repliesString = localStorage.getItem(key);
			if (repliesString == null) {
				Http({
					url: "/letter/letterbox/detail/replied",
					method: "post",
					body: { conversationId: conversationId },
					mock: false,
				}).then(
					(res) => {
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

	//todo: 往回跳转有问题，tab会回到第一个tab
	linkToBack = () => {
		this.props.history.goBack();
	};

	showMessage = (message) => {
		Toast.fail(message);
	};

	render() {
		const letter = this.props.firstLettersIReplied.find(
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
					Content
				</NavBar>

				{letter == null ? (
					<div>
						{this.showMessage(
							"Error url, please input correct url"
						)}
					</div>
				) : (
					<div>
						<WhiteSpace size="lg" />
						<LetterContent letter={letter}></LetterContent>
						<div>
							{replies.map((detailLetter, index) => (
								<div key={index}>
									{/* todo:写一个回复卡片 */}
									<LetterContent
										letter={detailLetter}
									></LetterContent>
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
		firstLettersIReplied: state.letter.firstLettersIReplied,
		detailOfFirstLetterReplied: state.letter.detailOfFirstLetterReplied,
	};
};

const mapDispatchToProps = () => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ReplyDetail);
