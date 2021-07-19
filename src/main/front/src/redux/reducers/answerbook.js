import * as AT from "../../constants/answerbook";

const initialState = {
	//格式：[{topicId:1, conversations:[]}, {topicId:2, conversations:[]} ...]
	contents: [],
	loadedTopicIds: [],
	error: "",
	loading: false,
};

const reducer = (preState = initialState, action) => {
	// let content = preState.contents.find((x) => x.topicId == action.topicId);
    // let refresh = content == null? true : false;
	switch (action.type) {
		case AT.LOAD_CONTENT:
			return {
				...preState,
				loading: true,
				error: "",
			};
		case AT.LOAD_CONTENT_SUCCESS:
			return {
				...preState,
				contents: [...preState.contents, action.payload],
                loadedTopicIds: [...preState.loadedTopicIds, action.topicId],
				loading: false,
				error: "",
			};
		case AT.LOAD_CONTENT_FAILURE:
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
