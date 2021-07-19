import React, { Component } from "react";
import { connect } from "react-redux";
import { loadConversationByTopicId } from "@src/redux/actions/answerbook";

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {};

	componentDidMount() {
		this.props.loadConversationByTopicId(this.props.match.params.id);
	}

	render() {
		return (
			<div>
				<h1>detail content</h1>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
        contents: state.answerbook.contents,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadConversationByTopicId: (topicId) =>dispatch(loadConversationByTopicId(topicId)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Content);
