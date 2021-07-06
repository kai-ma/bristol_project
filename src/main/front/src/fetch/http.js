import { Toast } from "antd-mobile";
export default function Http({
	url,
	method = "post",
	headers = {},
	body = {},
}) {
	const token = localStorage.getItem("token");
	let defaultHeader = {
		"Content-type": "application/json",
	};
	defaultHeader = token
		? {
				...defaultHeader,
				token,
		  }
		: defaultHeader;

	let params;
	if (method.toUpperCase() === "GET") {
		params = undefined;
	} else {
		params = {
			headers: {
				...defaultHeader,
				...headers,
			},
			method,
			body: JSON.stringify(body),
		};
	}

	return new Promise((resolve, reject) => {
		fetch("/api" + url, params)
			.then((res) => res.json())
			.then((res) => {
				if (res.status === 200) {
					resolve(res.data);
				} else {
					Toast.fail(res.errMsg, 1);
					reject(res.errMsg);
				}
			})
			.catch((err) => {
				Toast.fail(err, 1);
				reject(err);
			})
			.finally(() => {
				// console.log("set loading false");
			});
	});
}
