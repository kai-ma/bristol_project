import React, { Component } from "react";
import {
	NavBar,
	Toast,
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
        const matchedLetter = this.props.firstLettersIReplied.find(
            (x) => x.id == this.props.match.params.id
        );
        if(matchedLetter != null) {
            const conversationId = matchedLetter.conversationId;
            this.props.loadDetailOfFirstLetterReplied(conversationId);
        }else{
            this.showMessage(
                "Error url, please input correct url"
            )
        }        
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
        console.log(repliedLetters);
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadDetailOfFirstLetterReplied: (firstLetterId) =>
			dispatch(loadDetailOfFirstLetterReplied(firstLetterId)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ReplyDetail);
