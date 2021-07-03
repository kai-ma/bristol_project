// import { Toast } from "antd-mobile";
// export default function Http({
// 	url,
// 	method = "post",
// 	headers = {},
// 	body = {},
// 	setResult,
// }) {
// 	const token = localStorage.getItem("token");
// 	let defaultHeader = {
// 		"Content-type": "application/json",
// 	};
// 	defaultHeader = token
// 		? {
// 				...defaultHeader,
// 				token,
// 		  }
// 		: defaultHeader;

// 	let params;
// 	if (method.toUpperCase() === "GET") {
// 		params = undefined;
// 	} else {
// 		params = {
// 			headers: {
// 				...defaultHeader,
// 				...headers,
// 			},
// 			method,
// 			body: JSON.stringify(body),
// 		};
// 	}

// 	// var result = fetch("/api" + url, params)
// 	// 	.then((res) => res.json())
// 	// 	.then((res) => {
// 	// 		if (res.status === 200) {
// 	// 			return res.data;
// 	// 		} else {
// 	// 			// if (res.status === 1001) {
// 	// 			// 	// location.href = '/login?from=' + location.pathname;
// 	// 			// 	location.hash = "#/login?from=" + location.pathname;
// 	// 			// 	localStorage.clear();
// 	// 			// }
// 	// 			console.log(res.errMsg);
// 	// 			// Toast.fail(res.errMsg);
// 	// 			// reject(res.errMsg);
// 	// 		}
// 	// 	})
// 	// 	.catch((err) => {
// 	// 		console.log(err);
// 	// 		// Toast.fail(err);
// 	// 		// reject(err);
// 	// 	})
// 	// 	.finally(() => {
// 	// 		console.log("set loading false");
// 	// 	});

//     //     return result;
// 	return new Promise((resolve, reject) => {
// 		fetch("/api" + url, params)
// 			.then((res) => res.json())
// 			.then((res) => {
// 				if (res.status === 200) {
// 					resolve(res.data);
// 					setResult && setResult(res.data);
// 				} else {
// 					// if (res.status === 1001) {
// 					// 	// location.href = '/login?from=' + location.pathname;
// 					// 	location.hash = "#/login?from=" + location.pathname;
// 					// 	localStorage.clear();
// 					// }
//                     console.log(res.status);
// 	                console.log(res.errMsg);
// 					// Toast.fail(res.errMsg);
// 					// reject(res.errMsg);
// 				}
// 			})
// 			.catch((err) => {
// 	            console.log(err);
// 				// Toast.fail(err);
// 				// reject(err);
// 			})
// 			.finally(() => {
// 				// console.log("set loading false");
// 			});
// 	});
// }
