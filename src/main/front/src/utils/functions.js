import { Toast } from "antd-mobile";
import Http from "./http";

export function getTopics(){
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
