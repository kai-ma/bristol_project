// import * as UT from './userTypes';
// import axios from 'axios';
// import qs from 'qs'

// export const register = (username, email, password) => {
//     const userdata = {
//         username: username,
//         email: email,
//         password: password
//     };
//     return dispatch => {
//         axios.post("http://localhost:8080/user/register", qs.stringify(userdata))
//             .then(response => {
//                 // let token = response.data.token;
//                 console.log(response.data);
//                 // localStorage.setItem('jwtToken', token);
//                 dispatch(success(user));
//             })
//             .catch(error => {
//                 dispatch(failure(error));
//             });
//     };
// };

// const success = user => {
//     return {
//         type: UT.SUCCESS,
//         payload: user
//     };
// };

// const failure = error => {
//     return {
//         type: UT.FAILURE,
//         payload: error
//     };
// }; 