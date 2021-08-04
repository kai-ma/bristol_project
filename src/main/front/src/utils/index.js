export function isLogin () {
    const isLogin = localStorage.getItem('token');
    return isLogin;
}

export function setObjectToLocalStorage(key, object) {
	let objectString = JSON.stringify(object);
	localStorage.setItem(key, objectString);
}

export function getObjectFromLocalStorage(key) {
	let objectString = localStorage.getItem(key);
	return JSON.parse(objectString);
}
