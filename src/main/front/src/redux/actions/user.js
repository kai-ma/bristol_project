import * as actionTypes from "../../constants/user";
import Http from "@src/fetch/http.js";

export const login = (body) => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.LOGIN_REQUST,
		});

		Http({ url: "/login", body: body }).then(
			(res) => {
				dispatch(loginSuccess(res));
			},
			(err) => {
				dispatch(loginFailure(err));
			}
		);
	};
};

const loginSuccess = (user) => {
	return {
		type: actionTypes.LOGIN_SUCCESS,
		payload: user,
	};
};

const loginFailure = (error) => {
	return {
		type: actionTypes.LOGIN_FAILURE,
		payload: error,
	};
};
