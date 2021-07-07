import React, { Component } from "react";
import { NavBar, Icon, Tabs, WhiteSpace, Badge, Card } from "antd-mobile";
import { connect } from "react-redux";
import { loadConversationsStarted } from "../../redux/actions/letter";
import LetterCard from "../../components/LetterCard";
import ConversationCard from "../../components/ConversationCard";


const tabs = [
	//todo： bage 可以设置为dot <Badge dot> 或者文本 <Badge text={"3"}> 显示角标
	{ title: <Badge text={""}>I started</Badge> },
	{ title: <Badge text={""}>I replied</Badge> },
];

class LetterBox extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
		console.log("componentDidMount");
		this.props.loadConversationsStarted();
		setTimeout(() => {
			console.log(this.props.conversationsStarted);
		}, 2000);
	}

	render() {
		const conversationsStarted = this.props.conversationsStarted;
		return (
			<div>
				<NavBar mode="light">Letter Box</NavBar>
				<WhiteSpace />
				<div>
					<Tabs
						tabs={tabs}
						initialPage={1}
						onChange={(tab, index) => {
							console.log("onChange", index, tab);
						}}
						onTabClick={(tab, index) => {
							console.log("onTabClick", index, tab);
						}}
					>
						<div>
							{this.props.loading ? (
								<div>loading...</div>
							) : (
								<div>
									{conversationsStarted.map(
										(conversation, index) => (
											<div key={index}>
												<ConversationCard conversation={conversation} type={1}></ConversationCard>
											</div>
										)
									)}
								</div>
							)}
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								height: "150px",
								backgroundColor: "#fff",
							}}
						>
							Content of second tab
						</div>
					</Tabs>
					<WhiteSpace />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		conversationsStarted: state.letter.conversationsStarted,
		loading: state.letter.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadConversationsStarted: () => dispatch(loadConversationsStarted()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(LetterBox);
