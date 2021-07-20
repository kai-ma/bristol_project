import React, { Component } from "react";
import { connect } from "react-redux";
import { loadConversationByTopicId } from "@src/redux/actions/answerbook";
import Http from "@src/utils/http.js";
import { Toast,NavBar } from "antd-mobile";
import Loading from "@src/components/Loading";
import LetterContent from "@src/components/LetterContent";

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {
		conversations: [],
	};

	componentDidMount() {
		// this.props.loadConversationByTopicId(this.props.match.params.id);
		//从localStorage中获取content，如果获取不到，发送http请求，获取content。
		let topicId = this.props.match.params.id;
		let key = "content_" + topicId;
		let contentString = localStorage.getItem(key);
		if (contentString == null) {
			Http({
				url: "/answerbook/get/conversations/topic?topicId=" + topicId,
				method: "get",
				mock: false,
			}).then(
				(res) => {
					//需要JSON.stringify，不然会存入[Object,Object]
					let contentString = JSON.stringify(res);
					localStorage.setItem(key, contentString);
					this.setState({
						conversations: res,
					});
				},
				(err) => {
					Toast.fail(err.errMsg, 1);
				}
			);
		} else {
			let conversations = JSON.parse(contentString);
			this.setState({
				conversations: conversations,
			});
		}

        //todo：从localStorage中获取topic的name，显示到navbar上。
	}

	render() {
		return (
			<div>
                <NavBar mode="light">{}</NavBar>
				{this.state.conversations == null ? (
					<div>
						<Loading></Loading>
					</div>
				) : (
					<div>
						{this.state.conversations.map((conversation, index) => (
							<div key={index}>
								<LetterContent
									letter={conversation.letterVOList[0]}
								></LetterContent>
								<LetterContent
									letter={conversation.letterVOList[1]}
								></LetterContent>
							</div>
						))}
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		contents: state.answerbook.contents,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadConversationByTopicId: (topicId) =>
			dispatch(loadConversationByTopicId(topicId)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Content);
