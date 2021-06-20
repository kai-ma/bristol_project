import * as UT from './userTypes';

const initialState = {
	user: '', error: ''
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UT.REGISTER_REQUEST:
			return {
				...state,
			};
		case UT.SUCCESS:
			return {
				user: action.payload,
                error: ''
			};
		case UT.FAILURE:
			return {
				book: '',
                error: action.payload
			};
		default:
			return state;
	}
};

export default reducer;
