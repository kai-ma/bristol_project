import * as actionTypes from "../../constants/user";
import Http from "@src/utils/http.js";
import { Toast } from "antd-mobile";

export const login = (body, history) => {
	return async (dispatch) => {
		dispatch({
			type: actionTypes.LOGIN_REQUST,
		});

		await Http({ url: "/auth/login", body: body, mock:false }).then(
			(res) => {
				dispatch(loginSuccess(res));
                localStorage.setItem('token', res.token);
                localStorage.setItem('userid', res.id);
                Toast.info("login successfully!", 2);
                setTimeout(() =>{
                    history.push("/");
                }, 2000);
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
