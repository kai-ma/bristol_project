import * as actionTypes from "../../constants/letter";

const initialState = {
	letters: [],
	error: "",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LETTER_UPDATE:
		case actionTypes.LOAD_LETTERS:
			return {...state};
		case actionTypes.LETTERS_SUCCESS:
			return {
				letters: action.payload,
				error: "",
			};
		case actionTypes.LETTERS_FAILURE:
			return {
				letters: "",
				error: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
