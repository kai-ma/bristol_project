import React, { Component } from "react";
import Http from "@src/utils/http.js";
import Loading from "@src/components/Loading";
import LetterCard from "../LetterCard";

import {
	Pagination,
	Icon,
	WhiteSpace,
	Popover,
	Tag,
	Toast,
	NavBar,
	List,
} from "antd-mobile";
import { MdSort } from "react-icons/md";
import { AiOutlineTags } from "react-icons/ai";
import "./index.css";

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {
		conversations: [],
		//按照tag过滤过的conversations
		// filteredConversations: [],
		tags: [],
		choosenTags: new Set(),
		//{tag1:[id1, id2, ...]...}
		tagToConversationIds: {},
		//一页放多少个conversation，不会修改，写死为1，便于对这个进行操作
		pageSize: 5,
		//根据点击会变
		currentPage: 1,
		//根据conversation总数会变
		totalPage: 1,
		topicName: "",
		chooseByTags: false,
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
					if (
						res.conversaitons != null &&
						res.conversaitons.length > 0
					) {
						let contentString = JSON.stringify(res);
						localStorage.setItem(key, contentString);
						this.setState({
							conversations: res.conversations,
							totalPage: Math.ceil(
								res.conversations.length / pageSize
							),
							tagToConversationIds: res.tagToConversationIds,
							tags: Object.keys(res.tagToConversationIds),
						});
					}
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
				tagToConversationIds: content.tagToConversationIds,
				tags: Object.keys(content.tagToConversationIds),
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

	changeSort = (obj) => {
		if (obj.key === "1") {
			//根据time排序
			let conversaitons = this.state.conversations;
			conversaitons = conversaitons.sort(this.sortByTime);
			this.setState({ conversaitons: conversaitons });
		} else if (obj.key === "2") {
			//根据likes排序
			let conversaitons = this.state.conversations;
			conversaitons = conversaitons.sort(this.sortByLikes);
			this.setState({ conversaitons: conversaitons });
		}
	};

	//更新的靠前
	sortByTime = (a, b) => {
		return (
			new Date(b.collectedAt).getTime() -
			new Date(a.collectedAt).getTime()
		);
	};

	//likes数量多的靠前
	sortByLikes = (a, b) => {
		return b.votes - a.votes;
	};

	chooseByTags = () => {
		this.setState({
			chooseByTags: !this.state.chooseByTags,
		});
	};

	//选中或者取消选中tag
	//参考：https://segmentfault.com/q/1010000011208307
	selectTag = (selected, tag) => {
		let choosenTags = this.state.choosenTags;
		if (selected) {
			choosenTags.add(tag);
			this.setState({
				choosenTags: choosenTags,
			});
		} else {
			choosenTags.delete(tag);
			this.setState({
				choosenTags: choosenTags,
			});
		}
		this.filterConversations();
	};

	//按照选中tag过滤 conversations
	filterConversations = () => {
		let { choosenTags, conversations, tagToConversationIds } = this.state;
		if (choosenTags == null || choosenTags.length === 0) {
			return;
		}
		let conversationIds = new Set();
		for (var i in tagToConversationIds) {
			if (choosenTags.has(i)) {
				for (var j in tagToConversationIds[i]) {
					conversationIds.add(tagToConversationIds[i][j]);
				}
			}
		}
		return conversations.filter((conversation) =>
			conversationIds.has(conversation.id)
		);
	};

	render() {
		const {
			currentPage,
			pageSize,
			totalPage,
			topicName,
			tags,
			chooseByTags,
		} = this.state;
		const Item = Popover.Item;
		let conversations = chooseByTags
			? this.filterConversations()
			: this.state.conversations;
		return (
			<div>
				<NavBar
					leftContent="Back"
					mode="light"
					onLeftClick={this.linkToBack}
					rightContent={[
						//按照tag过滤
						<AiOutlineTags
							onClick={this.chooseByTags}
							style={{ marginRight: "2px" }}
						/>,

						<Popover
							// mask
							overlayClassName="fortest"
							overlayStyle={{ color: "currentColor" }}
							visible={this.state.visible}
							overlay={[
								<Item key="1">Sort by time</Item>,
								<Item key="2">Sort by Likes</Item>,
							]}
							align={{
								overflow: { adjustY: 0, adjustX: 0 },
								offset: [-10, 0],
							}}
							onVisibleChange={this.handleVisibleChange}
							onSelect={this.changeSort}
						>
							<div
								style={{
									height: "100%",
									padding: "0 15px",
									marginRight: "0px",
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

				{chooseByTags ? (
					//按照tag显示
					<div>
						<List renderHeader={() => "Filter by tags"}></List>
						{tags.map((tag, index) => (
							<Tag
								key={index}
								onChange={(selected) => {
									this.selectTag(selected, tag);
								}}
							>
								{tag}
							</Tag>
						))}
					</div>
				) : (
					//显示全部
					<div></div>
				)}

				{conversations == null ? (
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
						{conversations
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
