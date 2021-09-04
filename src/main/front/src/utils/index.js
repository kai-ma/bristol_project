import Http from "./http";
import { Toast } from "antd-mobile";

export function isLogin() {
	const isLogin = localStorage.getItem("token");
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

//如果localStorage中没有topic相关的，放入
export function loadTopicsToLocalStorage() {
	let key = "topic";
	let topicString = localStorage.getItem(key);
	if (topicString == null) {
		Http({
			url: "/answerbook/get/topic",
			method: "get",
			mock: false,
		}).then(
			(res) => {
				let topicString = JSON.stringify(res);
				localStorage.setItem(key, topicString);
				return res;
			},
			(err) => {
				Toast.info("Network error, please try again", 2);
			}
		);
	} else {
		return JSON.parse(topicString);
	}
}
