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
				Toast.fail(err.errMsg, 1);
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
				Toast.fail(err.errMsg, 1);   
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
				Toast.fail(err.errMsg, 1);  
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


export const clearLetters = () => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.CLEAR_LETTERS,
		});
	};
};

export const reply = (letter, value, history) => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.REPLY,
		});

        //回信 type是0
        Http({
            url: "/letter/reply",
            body: { ...value, firstLetterId: letter.id, type: 0 },
            mock: false,
        }).then(
            () => {
                Toast.success("Reply successfully!", 1);
                dispatch(replySuccess());
                setTimeout(() => {
                    history.push("/");
                    let key = "home_replies_" + letter.id;
                    localStorage.removeItem(key);
                }, 2000);
            },
            (err) => {
                Toast.fail(err.errMsg, 2);
                dispatch(replyFailure(err));
                setTimeout(() => {
                    history.push("/");
                }, 2000);
            }
        );
	};
};

const replySuccess = () => {
	return {
		type: actionTypes.REPLY_SUCCESS,
	};
};

const replyFailure = (error) => {
	return {
		type: actionTypes.REPLY_FAILURE,
        payload: error,
	};
};

export const send = (value, history) => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.SEND,
		});

        Http({
            url: "/letter/send/first",
            body: { ...value, topicId: value.topic[0] },
            mock: false,
        }).then(
            (res) => {
                Toast.success("Send successfully!", 1);
                dispatch(sendSuccess());
                setTimeout(() => {
                    history.push("/");
                }, 2000);
            },
            (err) => {
                Toast.fail(err.errMsg, 3);
                dispatch(sendFailure(err));
                setTimeout(() => {
                    history.push("/");
                }, 2000);
            }
        );
	};
};

const sendSuccess = () => {
	return {
		type: actionTypes.SEND_SUCCESS,
	};
};

const sendFailure = (error) => {
	return {
		type: actionTypes.SEND_FAILURE,
        payload: error,
	};
};

export const changeLetterBoxPage = (page) => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.CHANGE_LETTER_BOX_PAGE,
            payload: page,
		});
	};
};