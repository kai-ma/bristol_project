import React, { Component } from "react";
import { WhiteSpace, Card, WingBlank } from "antd-mobile";

//由于点击跳转的url不同，目前只能用于answerbook
class LetterCard extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {};

	render() {
		const { conversation } = this.props;
		const letter = conversation.letterVOList[0];
		return (
			<div>
				<WingBlank size="lg">
					<WhiteSpace size="lg" />
					<Card>
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
							content={<div>{letter.createdAt}</div>}
							extra={<div>{letter.pseudonym}</div>}
						/>
					</Card>
					<WhiteSpace size="lg" />
				</WingBlank>
			</div>
		);
	}
}

export default LetterCard;
