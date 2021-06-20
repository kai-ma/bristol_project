import * as AT from "./authTypes";

const initialState = {
	isLoggedIn: "",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case AT.LOGIN_REQUEST:
		case AT.LOGOUT_REQUEST:
			return {
				...state,
			};
		case AT.SUCCESS:
			return {
				isLoggedIn: action.payload,
			};
		case AT.FAILURE:
			return {
				isLoggedIn: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
