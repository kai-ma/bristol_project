import * as actionTypes from "../../constants/letter";
import Http from "@src/utils/http.js";

//是把数据从应用（这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。
//它是 store 数据的唯一来源。
export const loadLetters = () => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.LOAD_LETTERS,
		});

		Http({ url: "/letter/home/first", method: "get", mock:false}).then(
			(res) => {
				dispatch(letterSuccess(res));
			},
			(err) => {
				dispatch(letterFailure(err));
			}
		);

		// setTimeout(
		// 	() =>
		// 		Http({ url: "/loadletters", method: "get" }).then(
		// 			(res) => {
		// 				dispatch(letterSuccess(res));
		// 			},
		// 			(err) => {
		// 				dispatch(letterFailure(err));
		// 			}
		// 		),
		// 	1000
		// );
	};
};

export const updateLetters = () => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.UPDATE_LETTERS,
		});

		Http({ url: "/updateletters", method: "get" }).then(
			(res) => {
				dispatch(letterSuccess(res));
			},
			(err) => {
				dispatch(letterFailure(err));
			}
		);
	};
};

const letterSuccess = (letters) => {
	return {
		type: actionTypes.LETTERS_SUCCESS,
		payload: letters,
	};
};

const letterFailure = (error) => {
	return {
		type: actionTypes.LETTERS_FAILURE,
		payload: error,
	};
};

export const loadConversationsStarted = () => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.LOAD_CONVERSATIONS_STARTED,
		});

		Http({ url: "/loadconversations/started", method: "get" }).then(
			(res) => {
                dispatch(conversationStartedSuccess(res));
			},
			(err) => {
				dispatch(conversationFailure(err));
			}
		);
	};
};

const conversationStartedSuccess = (res) => {
	return {
		type: actionTypes.CONVERSATION_STARTED_SUCCESS,
		payload: res,
	};
};

const conversationFailure = (error) => {
	return {
		type: actionTypes.CONVERSATION_STARTED_FAILURE,
		payload: error,
	};
};
