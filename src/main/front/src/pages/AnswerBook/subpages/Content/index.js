import React, { Component } from "react";
import Http from "@src/utils/http.js";
import { Toast, NavBar } from "antd-mobile";
import Loading from "@src/components/Loading";
import LetterCard from "../LetterCard";

import {
	Pagination,
	Icon,
	WhiteSpace,
	Popover,
} from "antd-mobile";
import "./index.css";
import { MdSort } from "react-icons/md";

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {
		conversations: [],
		//一页放多少个conversation，不会修改，写死为1，便于对这个进行操作
		pageSize: 5,
		//根据点击会变
		currentPage: 1,
		//根据conversation总数会变
		totalPage: 1,
		topicName: "",
	};

	componentDidMount() {
		//1.根据topicId，获取text，用于navbar展示
		let topicString = localStorage.getItem("topic");
		let topics = JSON.parse(topicString);
		let topicId = this.props.match.params.id;
		const topic = topics.find((x) => x.id == this.props.match.params.id);
		this.setState({
			topicName: topic.text,
		});

		// this.props.loadConversationByTopicId(this.props.match.params.id);
		//从localStorage中获取content，如果获取不到，发送http请求，获取content。
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
                    let conversations = res.conversations;
					this.setState({
						conversations: conversations,
						totalPage: Math.ceil(conversations.length / pageSize),
					});
				},
				(err) => {
					Toast.fail(err.errMsg, 1);
				}
			);
		} else {
			let content = JSON.parse(contentString);
            let conversations = content.conversations;
			this.setState({
				conversations: conversations,
				totalPage: Math.ceil(conversations.length / pageSize),
			});
		}
	}

	loadPage = (currentPage) => {
		this.setState({
			currentPage: currentPage,
		});
	};

	linkToBack = () => {
		this.props.history.goBack();
	};

	

	render() {
		const { currentPage, pageSize, totalPage, topicName } =
			this.state;
		const Item = Popover.Item;

		return (
			<div>
				<NavBar
					leftContent="Back"
					mode="light"
					onLeftClick={this.linkToBack}
					rightContent={[
						<Popover
							align={{
								overflow: { adjustY: 0, adjustX: 0 },
								offset: [-10, 0],
							}}
							onSelect={this.onSelect}
						>
							<div
								style={{
									height: "100%",
									padding: "0 15px",
									marginRight: "-15px",
									display: "flex",
									alignItems: "center",
								}}
							>
								<Icon type="search" />
							</div>
						</Popover>,
						<Popover
							mask
							overlayClassName="fortest"
							overlayStyle={{ color: "currentColor" }}
							visible={this.state.visible}
							overlay={[
								<Item key="4" value="scan" data-seed="logId">
									Sort by time
								</Item>,
								<Item
									key="5"
									value="special"
									style={{ whiteSpace: "nowrap" }}
								>
									Sort by Like number
								</Item>,
							]}
							align={{
								overflow: { adjustY: 0, adjustX: 0 },
								offset: [-10, 0],
							}}
							onVisibleChange={this.handleVisibleChange}
							onSelect={this.onSelect}
						>
							<div
								style={{
									height: "100%",
									padding: "0 15px",
									marginRight: "-5px",
									display: "flex",
									alignItems: "center",
								}}
							>
								{<MdSort />}
							</div>
						</Popover>,
					]}
				>
					{topicName}
				</NavBar>
				{this.state.conversations == null ? (
					<div>
						<Loading></Loading>
					</div>
				) : (
					<div>
						<WhiteSpace size="lg" />
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
						{this.state.conversations
							.slice(
								(currentPage - 1) * pageSize,
								(currentPage - 1) * pageSize + pageSize
							)
							.map((conversation, index) => (
								<div key={index}>
									<LetterCard
                                        conversation={conversation}
									></LetterCard>
									<WhiteSpace size="lg" />
								</div>
							))}
					</div>
				)}
			</div>
		);
	}
}

export default Content;
