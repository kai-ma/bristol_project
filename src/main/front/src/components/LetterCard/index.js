import React, { Component } from "react";
import { WhiteSpace, Card } from "antd-mobile";


class LetterCard extends Component {
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
		const {letter} = this.props;
		return (
			<div>
				<WhiteSpace size="lg" />
				<Card onClick={() => this.handleClick(letter)}>
					<Card.Header title={letter.subject} />
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
						content={<div>{letter.time}</div>}
						extra={<div>{letter.name}</div>}
					/>
				</Card>
				<WhiteSpace size="lg" />
			</div>
		);
	}
}

export default LetterCard;
