import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
	user: userReducer,
	auth: authReducer,
});

export default rootReducer;
