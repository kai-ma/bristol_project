import * as AT from './authTypes';
import axios from 'axios';
import qs from 'qs'

export const authenticateUser = (email, password) => {
    console.log("email is " + email);
    const credentials = {
        email: email,
        password: password
    };
    return dispatch => {
        axios.post("http://localhost:8080/user/login", qs.stringify(credentials))
            .then(response => {
                // let token = response.data.token;
                console.log(response.data);
                // localStorage.setItem('jwtToken', token);
                dispatch(success(true));
            })
            .catch(error => {
                dispatch(failure());
            });
    };
};

export const logoutUser = () => {
    return dispatch => {
        dispatch({
            type: AT.LOGOUT_REQUEST
        });
        // localStorage.removeItem('jwtToken');
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