import React, { Component } from "react";
import { Pagination } from 'antd';

export default class StartDetail extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	
	render() {
		return (
			<div>
				<h1>StartDetail</h1>
                <Pagination defaultCurrent={1} total={50} />
			</div>
		);
	}
}