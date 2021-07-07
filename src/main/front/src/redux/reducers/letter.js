import * as actionTypes from "../../constants/letter";

const initialState = {
	letters: [],
	conversationsStarted: [],
	conversationsReplied: [],
	error: "",
	loading: false,
};

const reducer = (preState = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_LETTERS:
		case actionTypes.UPDATE_LETTERS:
		case actionTypes.LOAD_CONVERSATIONS_STARTED:
		case actionTypes.LOAD_CONVERSATIONS_REPLIED:
			return {
				...preState,
				loading: true,
				error: "",
			};
		case actionTypes.LETTERS_SUCCESS:
			return {
				...preState,
				letters: action.payload,
				loading: false,
				error: "",
			};
		case actionTypes.CONVERSATION_STARTED_SUCCESS:
			return {
				...preState,
				conversationsStarted: action.payload,
				loading: false,
				error: "",
			};
		case actionTypes.CONVERSATION_REPLIED_SUCCESS:
			return {
				...preState,
				conversationsReplied: action.payload,
				loading: false,
				error: "",
			};
		case actionTypes.LETTERS_FAILURE:
		case actionTypes.CONVERSATION_STARTED_FAILURE:
		case actionTypes.CONVERSATION_REPLIED_FAILURE:
			return {
				...preState,
				loading: false,
				error: action.payload,
			};

		default:
			return preState;
	}
};

export default reducer;
