import React, { Component } from "react";
import { Card, WingBlank, WhiteSpace } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'


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
		return (
			<div>
				<WingBlank size="lg">
					<WhiteSpace size="lg" />
					<Card onClick={this.handleClick}>
						<Card.Header
							title={this.props.subject}
							// thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
							// extra={<span>this is extra</span>}
						/>
						<Card.Body>
							<WhiteSpace size="lg" />
							<div>
								{this.props.shortContent}
							</div>
							<WhiteSpace size="lg" />
						</Card.Body>
						<Card.Footer
							// content="left footer"
							extra={<div>{this.props.name}</div>}
						/>
					</Card>
					<WhiteSpace size="lg" />
				</WingBlank>

				<WhiteSpace size="xl" />
				<WhiteSpace size="xl" />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		letter: state.letter,
	};
}

function mapDispatchToProps(dispatch) {
	return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LetterCard));
