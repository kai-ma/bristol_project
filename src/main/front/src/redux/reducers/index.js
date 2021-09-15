import { combineReducers } from "redux";
import letter from "./letter";
import user from "./user";
import answerbook from "./answerbook";
import report from "./report";

export default combineReducers({
	letter,
    user,
    answerbook,
    report,
});
