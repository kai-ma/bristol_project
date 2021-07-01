import * as actionTypes from "../../constants/letter";

export function update(data) {
	return {
		type: actionTypes.LETTER_UPDATE,
		data,
	};
}


export function load() {
    const data = {
        shortContent: "改变",
        subject: "主题",
        name: "姓名",
    };

	return {
		type: actionTypes.GET_LETTER,
		data,
	};
}
