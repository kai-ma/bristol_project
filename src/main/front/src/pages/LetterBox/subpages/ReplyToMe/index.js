import React, { Component } from "react";
import { NavBar, Toast, Popover, Modal, Icon } from "antd-mobile";
import LetterContent from "@src/components/LetterContent";
import { GoReport } from "react-icons/go";
import { RiMailAddLine } from "react-icons/ri";
import { connect } from "react-redux";
import { prepareReport } from "@src/redux/actions/letter";
class ReplyToMe extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {}

	navToBack = () => {
		this.props.history.goBack();
	};

	handleReport = () => {
		if (
			this.props.conversation != null &&
			this.props.conversation.reply != null
		) {
			this.props.prepareReport(this.props.conversation.reply);
			this.props.history.push("/report");
		}
	};

	handleRecommend = () => {
		if (
			this.props.conversation != null &&
			this.props.conversation.letter != null &&
			this.props.conversation.reply != null
		) {
			this.props.history.push("/recommend");
		}
	};

	showMessage = (message) => {
		Toast.fail(message);
	};

	handelSelect = (obj) => {
		if (obj.key === "1") {
			this.handleReport();
		} else if (obj.key === "2") {
			this.handleRecommend();
		}
	};

	render() {
		const Item = Popover.Item;
		const { conversation } = this.props;
		const reply = conversation.reply;
		return (
			<div>
				<NavBar
					leftContent="Back"
					mode="light"
					onLeftClick={this.navToBack}
					rightContent={[
						<Popover
							// mask
							overlayClassName="fortest"
							overlayStyle={{ color: "currentColor" }}
							overlay={[
								<Item key="1" icon={<GoReport />}>
									Report
								</Item>,
								<Item key="2" icon={<RiMailAddLine />}>
									Recommend
								</Item>,
							]}
							align={{
								overflow: { adjustY: 0, adjustX: 0 },
								offset: [-10, 0],
							}}
							onSelect={this.handelSelect}
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
								<Icon type="ellipsis" />
							</div>
						</Popover>,
					]}
				>
					Reply
				</NavBar>

				{conversation == null ? (
					<div>{this.showMessage("Please try again")}</div>
				) : (
					<div>
						<LetterContent letter={reply}></LetterContent>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		conversation: state.letter.conversation,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		prepareReport: (letter) => dispatch(prepareReport(letter)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyToMe);
