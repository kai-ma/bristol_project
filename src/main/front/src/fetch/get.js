export default function get(url) {
	var result = fetch(url, {
		credentials: "include",
		headers: {
			Accept: "application/json, text/plain, */*",
		},
	});

	return result;
}