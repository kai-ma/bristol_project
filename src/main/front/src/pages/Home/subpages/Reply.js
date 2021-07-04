import React, { Component } from "react";
//redux可以参考：https://www.freecodecamp.org/news/loading-data-in-react-redux-thunk-redux-saga-suspense-hooks-666b21da1569/
import { BsPencilSquare } from "react-icons/bs";
import { List, TextareaItem, InputItem, NavBar, Icon } from "antd-mobile";


class Reply extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
	}

	updateLetters = () => {
		
	};

	initialState = {
		letters: [],
	};

	render() {

		return (
			<div>
				<h1> Send a letter.</h1>
			</div>
		);
	}
}
export default Reply;

//card还可以加头像等，具体看antd-mobile的card教程
