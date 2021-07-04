import * as actionTypes from "../../constants/letter";

const initialState = {
	letters: [],
	error: "",
	loading: false,
};

const reducer = (preState = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_LETTERS:
		case actionTypes.UPDATE_LETTERS:
			return {
				...preState,
				loading: true,
				error: "",
			};
		case actionTypes.LETTERS_SUCCESS:
			return {
				letters: action.payload,
				loading: false,
				error: "",
			};
		case actionTypes.LETTERS_FAILURE:
			return {
				letters: "",
				loading: false,
				error: action.payload,
			};
		default:
			return preState;
	}
};

export default reducer;
