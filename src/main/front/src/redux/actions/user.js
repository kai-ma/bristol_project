import * as actionTypes from "../../constants/user";
import Http from "@src/utils/http.js";
import { Toast, Modal } from "antd-mobile";

const alert = Modal.alert;

export const register = (value, history) => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.REGISTER,
		});

		Http({ url: "/auth/register", body: value, mock: false }).then(
			(res) => {
				dispatch(registerSuccess());
				Toast.success("Register successfully!", 1, () => {
					history.push("/");
				});
			},
			(err) => {
				if (err.errMsg != null) {
					Toast.fail(err.errMsg, 2);
				} else {
					Toast.fail("Network error, please try again", 2);
				}
				dispatch(registerFailure(err));
			}
		);
	};
};

const registerSuccess = () => {
	return {
		type: actionTypes.REGISTER_SUCCESS,
	};
};

const registerFailure = (error) => {
	return {
		type: actionTypes.REGISTER_FAILURE,
		payload: error,
	};
};

export const login = (value, history) => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.LOGIN,
		});

		Http({
			url: "/auth/login",
			body: value,
			mock: false,
		}).then(
			(res) => {
				localStorage.setItem("token", res.token);
				dispatch(loginSuccess(res.user));

				//显示奖励
				if (res.bonus != null) {
					alert("Login successfully", res.bonus, [
						{
							text: "Ok",
						},
					]);
					history.push("/");
				} else {
					Toast.success("Login successfully", 2);
					history.push("/");
				}
			},
			(err) => {
				dispatch(loginFailure(err));
				if (err.errMsg != null) {
					Toast.fail(err.errMsg, 2);
				} else {
					Toast.fail("Network error, please try again", 2);
				}
			}
		);
	};
};

const navToHome = (history) => {
	history.push("/");
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

export const loadUserInfo = () => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.LOAD_USER_INFO,
		});

		Http({ url: "/user/info", method: "get", mock: false }).then(
			(res) => {
				dispatch(loadUserInfoSuccess(res.userinfo));
			},
			(err) => {
				dispatch(loadUserInfoFailure(err));
			}
		);
	};
};

const loadUserInfoSuccess = (user) => {
	return {
		type: actionTypes.LOAD_USER_INFO_SUCCESS,
		payload: user,
	};
};

const loadUserInfoFailure = (error) => {
	return {
		type: actionTypes.LOAD_USER_INFO_FAILURE,
		payload: error,
	};
};

export const updateUserSettings = (userinfo, settings, history) => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.UPDATE_USER_SETTING,
		});

		Http({
			url: "/user/settings",
			body: settings,
			mock: false,
		}).then(
			(res) => {
				if (settings.pseudonym != null) {
					userinfo.pseudonym = settings.pseudonym;
				}
				if (settings.allowCollect != null) {
					userinfo.allowCollect = settings.allowCollect;
				}
				dispatch(updateUserSettingsSuccess(userinfo));
				Toast.success("Change settings successfully", 2, () =>
					history.push("/user")
				);
			},
			(err) => {
				dispatch(updateUserSettingsFailure(err));
				Toast.fail(err.errMsg, 2);
			}
		);
	};
};

const updateUserSettingsSuccess = (userinfo) => {
	return {
		type: actionTypes.UPDATE_USER_SETTING_SUCCESS,
		payload: userinfo,
	};
};

const updateUserSettingsFailure = (error) => {
	return {
		type: actionTypes.UPDATE_USER_SETTING_FAILURE,
		payload: error,
	};
};
