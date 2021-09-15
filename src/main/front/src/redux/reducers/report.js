import * as actionTypes from "../../constants/report";

const initialState = {
	reportedIds:[],
	error: "",
	reporting: false,
};

const reducer = (preState = initialState, action) => {
	switch (action.type) {
		case actionTypes.SEND_REPORT_REQUEST:
			return {
				...preState,
				reporting: true,
				error: "",
			};
		case actionTypes.SEND_REPORT_SUCCESS:
			return {
				...preState,
				reporting: false,
				reportedIds: action.payload,
			};
		case actionTypes.SEND_REPORT_FAILURE:
			return {
				...preState,
				reporting: false,
				error: action.payload,
			};
		default:
			return preState;
	}
};

export default reducer;
