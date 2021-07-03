const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();


// answerbook列表
// require("./answerbook.js");
router.get("/api/books", async (ctx, next) => {
	ctx.response.body = {
		status: 200,
		data: [
			{
				icon: "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
				text: `love`,
				index: 1,
			},
			{
				icon: "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
				text: `family`,
				index: 2,
			},
		],
	};
    // ctx.response.body = {
	// 	status: 500,
	// 	errMsg: "Network error!"
	// };
});

// log request URL:  打印 url
app.use(async (ctx, next) => {
	console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	await next();
});

router.get("/", async (ctx, next) => {
	ctx.response.body = {
		a: 1,
		b: "123",
	};
});


// 开始服务并生成路由
app.use(router.routes()).use(router.allowedMethods());
app.listen(8090);
console.log("app started at port 8090...");
