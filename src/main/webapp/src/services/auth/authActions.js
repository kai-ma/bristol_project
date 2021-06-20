import * as AT from './authTypes';

export const authenticateUser = (email, password) => {
    return dispatch => {
        dispatch({
            type: AT.LOGIN_REQUEST
        });
        if(email === "test" && password === "test") {
            dispatch(success(true));
        } else {
            dispatch(failure());
        }
    };
};


export const logoutUser = () => {
    return dispatch => {
        dispatch({
            type: AT.LOGOUT_REQUEST
        });
        dispatch(success(false));
    };
};

const success = isLoggedIn => {
    return {
        type: AT.SUCCESS,
        payload: isLoggedIn
    };
};

const failure = () => {
    return {
        type: AT.FAILURE,
        payload: false
    };
}; 