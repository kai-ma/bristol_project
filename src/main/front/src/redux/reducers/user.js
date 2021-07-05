import * as actionTypes from "../../constants/user";

const initialState = {
	userinfo: {},
	error: "",
	loading: false,
};

const reducer = (preState = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN_REQUST:
			return {
				...preState,
				loading: true,
				error: "",
			};
		case actionTypes.LOGIN_SUCCESS:
			return {
				user: action.payload,
				loading: false,
				error: "",
			};
		case actionTypes.LOGIN_FAILURE:
			return {
				user: "",
				loading: false,
				error: action.payload,
			};
		default:
			return preState;
	}
};

export default reducer;
