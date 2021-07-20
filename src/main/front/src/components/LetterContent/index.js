import React, { Component } from "react";
import { WingBlank, WhiteSpace, Card } from "antd-mobile";
class LetterContent extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {};

	render() {
		const { letter } = this.props;
		return (
			<div>
				<WingBlank size="lg">
					<Card>
						{letter.type === 2 ? (
							<Card.Header title={letter.title} />
						) : (null
						)}
						<Card.Body>
							<WhiteSpace size="lg" />
							<div>{letter.content}</div>
							<WhiteSpace size="lg" />
						</Card.Body>
						<Card.Footer extra={<div>{letter.pseudonym}</div>} />
					</Card>
				</WingBlank>
			</div>
		);
	}
}

export default LetterContent;
