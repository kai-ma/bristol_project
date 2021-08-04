import React, { Component } from "react";
import { ActivityIndicator } from "antd-mobile";

class Loading extends Component {

	render() {
		return (
			<div>
				<ActivityIndicator toast text="Loading..." size="small" />
			</div>
		);
	}
}

export default Loading;
