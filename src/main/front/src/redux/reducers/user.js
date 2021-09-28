import * as actionTypes from "../../constants/user";

const initialState = {
	userinfo: {},
	error: "",
	loading: false,
	reloadUserInfo: false,
};

const reducer = (preState = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN:
			return {
				...preState,
				loading: true,
				error: "",
			};
		case actionTypes.REGISTER:
			return {
				...preState,
				loading: true,
				error: "",
			};
		case actionTypes.LOAD_USER_INFO:
			return {
				...preState,
				loading: true,
				error: "",
			};
		case actionTypes.RELOAD_USER_INFO:
			return {
				...preState,
				reloadUserInfo: true,
			};
        case actionTypes.UPDATE_USER_SETTING:
            return {
				...preState,
				loading: true,
				error: "",
			};
		case actionTypes.LOGIN_SUCCESS:
			return {
				userinfo: action.payload,
				loading: false,
				error: "",
			};
		case actionTypes.REGISTER_SUCCESS:
			return {
				...preState,
				loading: false,
			};
		case actionTypes.LOAD_USER_INFO_SUCCESS:
			return {
				...preState,
				loading: false,
				userinfo: action.payload,
				reloadUserInfo: false,
			};
        case actionTypes.UPDATE_USER_SETTING_SUCCESS:
            return {
				...preState,
				loading: false,
				userinfo: action.payload,
				reloadUserInfo: false,
			};
		case actionTypes.REGISTER_FAILURE:
		case actionTypes.LOGIN_FAILURE:
		case actionTypes.LOAD_USER_INFO_FAILURE:
        case actionTypes.UPDATE_USER_SETTING_FAILURE:
			return {
				...preState,
				loading: false,
				error: action.payload,
				reloadUserInfo: false,
			};
		default:
			return preState;
	}
};

export default reducer;
