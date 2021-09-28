import React, { Component } from "react";
import { ActivityIndicator } from "antd-mobile";

class Loading extends Component {
    constructor(props) {
		super(props);
		this.state = this.initialState;
	}

    initialState = {};

	render() {
        const { message } = this.props;

		return (
			<div>
				<ActivityIndicator toast text={message == null ? "Loading..." : message} size="small" />
			</div>
		);
	}
}

export default Loading;
