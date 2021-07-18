import React, { Component } from "react";
import {
	NavBar,
	Button,
	Toast,
	WingBlank,
	Card,
	WhiteSpace,
} from "antd-mobile";
import { connect } from "react-redux";
import LetterContent from "@src/components/LetterContent";
import { loadDetailOfFirstLetterReplied } from "@src/redux/actions/letter";

class ReplyDetail extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
        console.log("loadMyRepliedFirstLetters");
			const conversationId = this.props.firstLettersIReplied.find(
				(x) => x.id == this.props.match.params.id
			).conversationId;
			this.props.loadDetailOfFirstLetterReplied(conversationId);
		// if (this.props.reloadDetailOfFirstLetterReplied) {
			
		// }
	}

	initialState = {
		reload: true,
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
		const repliedLetters = this.props.detailOfFirstLetterReplied;
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
						<LetterContent letter={letter}></LetterContent>
						<div>
							{repliedLetters.map((detailLetter, index) => (
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
		reloadDetailOfFirstLetterReplied: state.letter.reloadDetailOfFirstLetterReplied,
		detailOfFirstLetterReplied: state.letter.detailOfFirstLetterReplied,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadDetailOfFirstLetterReplied: (firstLetterId) =>
			dispatch(loadDetailOfFirstLetterReplied(firstLetterId)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ReplyDetail);
