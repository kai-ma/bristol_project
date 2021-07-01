import * as actionTypes from "../../constants/letter";

//如果不填默认会报错
const initialState = {
	shortContent: "",
	subject: "",
	name: "",
};

export default function userinfo(state = initialState, action) {
	switch (action.type) {
		case actionTypes.LETTER_UPDATE:
		case actionTypes.GET_LETTER:
			return action.data;
		default:
			return state;
	}
}
