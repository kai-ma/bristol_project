export function isLogin () {
    const isLogin = localStorage.getItem('token');
    return isLogin;
}