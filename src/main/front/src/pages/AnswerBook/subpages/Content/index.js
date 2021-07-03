import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {};

	handleClick = (data) => {
		console.log(data);
        const index = data.index;
		return this.props.history.push("/answerbook/content" + index);
	};

	componentDidMount() {
		//获取数据
	}

	render() {
		return (
			<div>
				<h1>detail content</h1>
			</div>
		);
	}
}

export default withRouter(Content);
