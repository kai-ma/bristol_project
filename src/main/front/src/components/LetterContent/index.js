import React, { Component } from "react";
import { WingBlank, WhiteSpace, Card } from "antd-mobile";
class LetterContent extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {};

	handleClick = () => {
		console.log("click");
		return this.props.history.push("/user");
	};

	render() {
		const { letter } = this.props;
		return (
			<div>
				<WingBlank size="lg">
					<WhiteSpace size="lg" />
					<Card>
						<Card.Header title={letter.title ? letter.title : null} />
						<Card.Body>
							<WhiteSpace size="lg" />
							<div>{letter.content}</div>
							<WhiteSpace size="lg" />
						</Card.Body>
						<Card.Footer extra={<div>{letter.pseudonym}</div>} />
					</Card>
					<WhiteSpace size="lg" />
				</WingBlank>
			</div>
		);
	}
}

export default LetterContent;
