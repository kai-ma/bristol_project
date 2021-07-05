import { combineReducers } from "redux";
import letter from "./letter";
import user from "./user";

export default combineReducers({
	letter,
    user,
});
