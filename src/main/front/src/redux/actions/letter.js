import * as actionTypes from "../../constants/letter";
import Http from "@src/utils/http.js";
import { Toast } from "antd-mobile";

//是把数据从应用（这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。
//它是 store 数据的唯一来源。

//获取首页的信
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
                //todo: 应该把这里的toast换成根据errorcode判断，如果是刷新时间未到，不显示；
                //如果是空，转换到答案之书
				Toast.fail(err.errMsg, 1);  
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

//获取letterBox中我发出的首封信 letterbox的tab0
export const loadMyFirstLetters = () => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.LOAD_LETTERS,
		});

		Http({ url: "/letter/letterbox/first", method: "get", mock:false}).then(
			(res) => {
				dispatch(loadMyFirstLettersSuccess(res));
			},
			(err) => {
				Toast.fail(err, 1);  
				dispatch(loadMyFirstLettersFailure(err));
			}
		);
	};
};

const loadMyFirstLettersSuccess = (res) => {
	return {
		type: actionTypes.LOAD_MY_FIRST_LETTERS_SUCCESS,
		payload: res,
	};
};

const loadMyFirstLettersFailure = (error) => {
	return {
		type: actionTypes.LOAD_MY_FIRST_LETTERS_FAILURE,
		payload: error,
	};
};


//获取letterBox中我回复的首封信
export const loadFirstLettersIReplied = () => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.LOAD_FIRST_LETTERS_REPLIED,
		});

		Http({ url: "/letter/letterbox/replied/first", method: "get", mock:false}).then(
			(res) => {
				dispatch(loadFirstLettersRepliedSuccess(res));
			},
			(err) => {
				Toast.fail(err, 1);  
				dispatch(loadFirstLettersRepliedFailure(err));
			}
		);
	};
};

const loadFirstLettersRepliedSuccess = (res) => {
	return {
		type: actionTypes.LOAD_FIRST_LETTERS_REPLIED_SUCCESS,
		payload: res,
	};
};

const loadFirstLettersRepliedFailure = (error) => {
	return {
		type: actionTypes.LOAD_FIRST_LETTERS_REPLIED_FAILURE,
		payload: error,
	};
};


//根据letterBox中我发出的某个信，获取detail
export const loadDetailOfMyFirstLetter = () => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.LOAD_DETAIL_OF_MY_FIRST_LETTER,
		});

		Http({ url: "/letter/letterbox/detail/my", method: "get", mock:false}).then(
			(res) => {
				dispatch(loadDetailOfMyFirstLetterSuccess(res));
			},
			(err) => {
				Toast.fail(err, 1);  
				dispatch(loadMyFirstLettersFailure(err));
			}
		);
	};
};

const loadDetailOfMyFirstLetterSuccess = (res) => {
	return {
		type: actionTypes.LOAD_DETAIL_OF_MY_FIRST_LETTER_SUCCESS,
		payload: res,
	};
};

//根据letterBox中我回复的首封信，获取detail
export const loadDetailOfFirstLetterReplied = (conversationId) => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.LOAD_DETAIL_OF_FIRST_LETTER_REPLIED,
		});

		Http({ url: "/letter/letterbox/detail/replied", method: "post", body : {conversationId: conversationId}, mock:false}).then(
			(res) => {
				dispatch(loadDetailOfFirstLetterRepliedSuccess(res));
			},
			(err) => {
				Toast.fail(err, 1);  
				dispatch(loadMyFirstLettersFailure(err));
			}
		);
	};
};

const loadDetailOfFirstLetterRepliedSuccess = (res) => {
	return {
		type: actionTypes.LOAD_DETAIL_OF_FIRST_LETTER_REPLIED_SUCCESS,
		payload: res,
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
