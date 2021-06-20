import * as UT from "./userTypes";

const initialState = {
	users: [],
	error: "",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UT.FETCH_USER_REQUEST:
			return {
                //如果是FETCH_USER_REQUEST，copy state。
				...state,
			};
		case UT.FETCH_USER_SUCCESS:
			return {
				users: action.payload,
				error: "",
			};
		case UT.FETCH_USER_FAILURE:
			return {
				users: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
