import React, { Component } from "react";
import { NavBar, WhiteSpace, Card } from "antd-mobile";
import { connect } from "react-redux";
import { loadConversationsStarted } from "../../../redux/actions/letter";

class Conversation extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
		console.log("componentDidMount");
		console.log(this.props.conversationsStarted);
	}

	linkToLetterBox = () => {
		this.props.history.goBack();
	};

	render() {
		const conversation = this.props.conversationsStarted.find(
			(x) => x.id == this.props.match.params.id
		);

		return (
			<div>
				<NavBar
					leftContent="Back"
					mode="light"
					onLeftClick={this.linkToLetterBox}
				>
					answerbook
				</NavBar>
				<div>
					{conversation.content.map((letter, index) => (
						<div key={index}>
							<div>
								<div>
									<WhiteSpace size="lg" />
									<Card>
										<Card.Header title={letter.subject} />
										<Card.Body>
											<WhiteSpace size="lg" />
											<div>{letter.content}</div>
											<WhiteSpace size="lg" />
										</Card.Body>
										<Card.Footer
											content={<div>{letter.time}</div>}
											extra={<div>{letter.name}</div>}
										/>
									</Card>
								</div>
							</div>
						</div>
					))}
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
export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
