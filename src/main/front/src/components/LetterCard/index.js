import React, { Component } from "react";
import { Card, WingBlank, WhiteSpace } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'

//没什么用了，可以直接删掉了
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
        const {content, name, subject} = this.props.letter
        console.log(this.props);
		return (
			<div>
				<WingBlank size="lg">
					<WhiteSpace size="lg" />
					<Card onClick={this.handleClick}>
						<Card.Header
							title={subject}
							// thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
							// extra={<span>this is extra</span>}
						/>
						<Card.Body>
							<WhiteSpace size="lg" />
							<div>
								{content}
							</div>
							<WhiteSpace size="lg" />
						</Card.Body>
						<Card.Footer
							// content="left footer"
							extra={<div>{name}</div>}
						/>
					</Card>
					<WhiteSpace size="lg" />
				</WingBlank>
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
