import React, { Component } from "react";
import { WhiteSpace, Card, WingBlank } from "antd-mobile";
import { withRouter } from 'react-router-dom';

class LetterCard extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {};

	handleClick = (conversation) => {
		const topicId = conversation.topicId;
		const conversationId = conversation.id;
		this.props.history.push({
			pathname: "/answerbook/conversation",
			state: { topicId: topicId, conversationId: conversationId },
		});
	};

	render() {
		const { conversation } = this.props;
		const letter = conversation.letterVOList[0];
		return (
			<div>
				<WingBlank size="lg">
					<WhiteSpace size="lg" />
					<Card onClick={() => this.handleClick(conversation)}>
						<Card.Header title={letter.title} />
						<Card.Body>
							<WhiteSpace size="lg" />
							<div>
								{letter.content.substring(
									0,
									letter.content.length > 100
										? 99
										: letter.content.length - 1
								) + "..."}
							</div>
							<WhiteSpace size="lg" />
						</Card.Body>
						<Card.Footer
							content={<div>{conversation.collectedAt}</div>}
							extra={<div>{letter.pseudonym}</div>}
						/>
					</Card>
					<WhiteSpace size="lg" />
				</WingBlank>
			</div>
		);
	}
}

export default withRouter(LetterCard);
