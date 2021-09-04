import * as actionTypes from "../../constants/letter";

const initialState = {
	letters: [],
	myFirstLetters: [],
	firstLettersIReplied: [],
    detailOfFirstLetterReplied: [],
	conversationsStarted: [],
	conversationsReplied: [],
	error: "",
	loading: false,
	reLoadLetters: true,
	reloadMyFirstLetters: true,
	reloadFirstLettersIReplied: true,
    reloadDetailOfFirstLetterReplied: true,
};

const reducer = (preState = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_LETTERS:
		case actionTypes.UPDATE_LETTERS:
		case actionTypes.LOAD_CONVERSATIONS_STARTED:
		case actionTypes.LOAD_CONVERSATIONS_REPLIED:
		case actionTypes.LOAD_MY_FIRST_LETTERS:
		case actionTypes.LOAD_FIRST_LETTERS_REPLIED:
		case actionTypes.LOAD_DETAIL_OF_MY_FIRST_LETTER:
		case actionTypes.LOAD_DETAIL_OF_FIRST_LETTER_REPLIED:
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
				reLoadLetters: false,
			};
		case actionTypes.LOAD_MY_FIRST_LETTERS_SUCCESS:
			return {
				...preState,
				myFirstLetters: action.payload,
				loading: false,
				error: "",
				reloadMyFirstLetters: false,
			};
		case actionTypes.LOAD_FIRST_LETTERS_REPLIED_SUCCESS:
			return {
				...preState,
				firstLettersIReplied: action.payload,
				loading: false,
				error: "",
				reloadFirstLettersIReplied: false,
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
		case actionTypes.LOAD_DETAIL_OF_MY_FIRST_LETTER_SUCCESS:
			return {
				...preState,
				detailOfMyFirstLetter: action.payload,
				loading: false,
				error: "",
				reloadDetailOfMyFirstLetter: false,
			};
		case actionTypes.LOAD_DETAIL_OF_FIRST_LETTER_REPLIED_SUCCESS:
			return {
				...preState,
				detailOfFirstLetterReplied: action.payload,
				loading: false,
				error: "",
				reloadDetailOfFirstLetterReplied: false,
			};
		case actionTypes.LETTERS_FAILURE:
		case actionTypes.CONVERSATION_STARTED_FAILURE:
		case actionTypes.CONVERSATION_REPLIED_FAILURE:
		case actionTypes.LOAD_MY_FIRST_LETTERS_FAILURE:
		case actionTypes.LOAD_FIRST_LETTERS_REPLIED_FAILURE:
			return {
				...preState,
				loading: false,
				error: action.payload,
			};
        case actionTypes.CLEAR_LETTERS:
            return initialState;
		default:
			return preState;
	}
};

export default reducer;
