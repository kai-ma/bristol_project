import { Toast } from "antd-mobile";
export default function Http({
	url,
	method = "post",
	headers = {},
	body = {},
	mock,
}) {
	const token = localStorage.getItem("token");
	let defaultHeader = {
		"Content-Type": "application/json",
	};
	defaultHeader = token
		? {
				...defaultHeader,
				Authorization: "Bearer "+ token,
		  }
		: defaultHeader;

	let params;
	if (method.toUpperCase() === "GET") {
		params = {
			headers: {
				...defaultHeader,
				...headers,
			},
		};
	} else {
		params = {
			headers: {
				...defaultHeader,
				...headers,
			},
			method,
			// body,
			body: JSON.stringify(body),
		};
	}
	console.log(params);

	const URL = mock == null ? "api" + url : "http://localhost:8080" + url;
	return new Promise((resolve, reject) => {
		fetch(URL, params)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.status === "success") {
					resolve(res.data);
				} else {
					Toast.fail(res.data.errMsg, 2);
					reject(res.data.errMsg);
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

//todo: 404 page not found目前是toast.fail打印出页面
