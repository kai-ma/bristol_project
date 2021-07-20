import React, { Component } from "react";
import { connect } from "react-redux";
import { loadConversationByTopicId } from "@src/redux/actions/answerbook";
import Http from "@src/utils/http.js";
import { Toast, NavBar } from "antd-mobile";
import Loading from "@src/components/Loading";
import LetterContent from "@src/components/LetterContent";
import { Pagination, Icon, WhiteSpace } from "antd-mobile";
import "./index.css";

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {
		conversations: [],
        //一页放多少个conversation，不会修改
        pageSize: 2,  
        //根据点击会变
        currentPage: 1,
        //根据conversation总数会变
        totalPage: 1,
	};

	componentDidMount() {
		// this.props.loadConversationByTopicId(this.props.match.params.id);
		//从localStorage中获取content，如果获取不到，发送http请求，获取content。
		let topicId = this.props.match.params.id;
		let key = "content_" + topicId;
		let contentString = localStorage.getItem(key);
        let pageSize = this.state.pageSize;
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
                        totalPage : Math.ceil(res.length / pageSize),
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
                totalPage : Math.ceil(conversations.length / pageSize),
			});
		}
	}

	loadPage = (currentPage) => {
        this.setState({
            currentPage: currentPage,
        });
	};

	render() {
        const {currentPage, pageSize, totalPage} = this.state;
		return (
			<div>
				<NavBar mode="light">{}</NavBar>
				{this.state.conversations == null ? (
					<div>
						<Loading></Loading>
					</div>
				) : (
					<div>
                        <WhiteSpace size="lg" />
                        <div className="pagination-container">
							{/* <p className="sub-title">Button with text</p> */}
							<Pagination
								total={totalPage}
								className="custom-pagination-with-icon"
								current={1}
								locale={{
									prevText: (
										<span className="arrow-align">
											<Icon type="left" />
											Prev
										</span>
									),
									nextText: (
										<span className="arrow-align">
											Next
											<Icon type="right" />
										</span>
									),
								}}
								onChange={(current) => this.loadPage(current)}
							/>
                            <WhiteSpace size="lg" />
						</div>
						{this.state.conversations.slice((currentPage-1)*pageSize,(currentPage-1)*pageSize+pageSize).map((conversation, index) => (
							<div key={index}>
								<LetterContent
									letter={conversation.letterVOList[0]}
								></LetterContent>
								<LetterContent
									letter={conversation.letterVOList[1]}
								></LetterContent>
								<WhiteSpace size="lg" />
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
