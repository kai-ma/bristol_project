import * as actionTypes from "../../constants/letter";

const initialState = {
	letters: [],
	myFirstLetters: [],
    unread: 0,
	firstLettersIReplied: [],
	detailOfFirstLetterReplied: [],
	error: "",
	loading: false,
	reLoadLetters: true,
	reloadMyFirstLetters: true,
	reloadFirstLettersIReplied: true,
	page: 0,
	conversation: {},
	reportLetter: {},
	recommendedConversationIds: [],
	recommending: false,
};

const reducer = (preState = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_LETTERS:
		case actionTypes.UPDATE_LETTERS:
		case actionTypes.LOAD_MY_FIRST_LETTERS:
		case actionTypes.LOAD_FIRST_LETTERS_REPLIED:
		case actionTypes.LOAD_DETAIL_OF_FIRST_LETTER_REPLIED:
		case actionTypes.REPLY:
		case actionTypes.SEND:
			return {
				...preState,
				loading: true,
				error: "",
			};
		case actionTypes.PREPARE_REPLY_TO_ME:
			return {
				...preState,
				conversation: action.payload,
			};
		case actionTypes.PREPARE_REPORT:
			return {
				...preState,
				reportLetter: action.payload,
			};
		case actionTypes.RECOMMEND_REQUEST:
			return {
				...preState,
				recommending: true,
			};
        case actionTypes.CHANGE_UNREAD:
            return {
				...preState,
				unread: action.payload,
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
				myFirstLetters: action.payload.myFirstLetters,
                unread: action.payload.unread,
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
		case actionTypes.LOAD_DETAIL_OF_FIRST_LETTER_REPLIED_SUCCESS:
			return {
				...preState,
				detailOfFirstLetterReplied: action.payload,
				loading: false,
				error: "",
			};
		case actionTypes.REPLY_SUCCESS:
			return {
				...preState,
				loading: false,
				reloadFirstLettersIReplied: true,
			};
		case actionTypes.SEND_SUCCESS:
			return {
				...preState,
				loading: false,
				reloadMyFirstLetters: true,
			};
		case actionTypes.CHANGE_LETTER_BOX_PAGE:
			return {
				...preState,
				page: action.payload,
			};
		case actionTypes.RECOMMEND_SUCCESS:
			return {
				...preState,
				recommending: false,
				recommendedConversationIds: action.payload,
			};
		case actionTypes.LETTERS_FAILURE:
		case actionTypes.LOAD_MY_FIRST_LETTERS_FAILURE:
		case actionTypes.LOAD_FIRST_LETTERS_REPLIED_FAILURE:
		case actionTypes.REPLY_FAILURE:
		case actionTypes.SEND_FAILURE:
			return {
				...preState,
				loading: false,
				error: action.payload,
			};
		case actionTypes.REPLY_FAILURE:
			return {
				...preState,
				recommending: false,
				error: action.payload,
			};
		case actionTypes.CLEAR_LETTERS:
			return initialState;
		default:
			return preState;
	}
};

export default reducer;
