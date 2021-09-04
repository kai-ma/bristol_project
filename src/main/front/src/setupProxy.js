//https://www.cnblogs.com/lanshu123/p/10660548.html

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		createProxyMiddleware("/test", {
			target: "http://localhost:8090"
			// changeOrigin: true
		})
	);
};
