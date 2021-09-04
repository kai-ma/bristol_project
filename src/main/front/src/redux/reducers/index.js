import { combineReducers } from "redux";
import letter from "./letter";
import user from "./user";
import answerbook from "./answerbook";

export default combineReducers({
	letter,
    user,
    answerbook,
});
