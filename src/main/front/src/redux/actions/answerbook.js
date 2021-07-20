import * as actionTypes from "../../constants/answerbook";
import Http from "@src/utils/http.js";
import { Toast } from "antd-mobile";
//获取首页的信
export const loadConversationByTopicId = (topicId) => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.LOAD_CONTENT,
		});

		Http({
			url: "/answerbook/get/conversations/topic?topicId=" + topicId,
			method: "get",
			mock: false,
		}).then(
			(res) => {
				dispatch(loadConversationByTopicIdSuccess(res, topicId));
			},
			(err) => {
				Toast.fail(err.errMsg, 1);
				dispatch(answerbookFailure(err));
			}
		);
	};
};

const loadConversationByTopicIdSuccess = (conversations, topicId) => {
	return {
		type: actionTypes.LOAD_CONTENT_SUCCESS,
		topicId: topicId,
		payload: conversations,
	};
};

const answerbookFailure = (error) => {
	return {
		type: actionTypes.LOAD_CONTENT_FAILURE,
		payload: error,
	};
};
