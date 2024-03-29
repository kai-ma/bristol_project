const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
const bodyParser = require("koa-bodyparser");

router.post("/api/login", async (ctx, next) => {
	const { password } = ctx.request.body;
	if (password != "123456") {
		ctx.response.body = {
			status: "fail",
			data: {
				errCode: 10002,
				errMsg: "Please input correct password",
			},
		};
	} else {
		ctx.response.body = {
			status: "success",
			data: {
				id: 123458,
				subject: "Girl",
				name: "amaica Kincaid",
				token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJta3g0NDk5QDE2My5jb20iLCJleHAiOjE2MjQ2OTk0NjYsImlhdCI6MTYyNDY5MjI2Nn0.zdYWKH7C-XAJ5pXn5MlPLXvVSHLqYqK9GXWZrI2b-9c",
			},
		};
	}
});

router.post("/api/register", async (ctx, next) => {
	ctx.response.body = {
		status: "success",
		data: {
			id: 123458,
			subject: "Girl",
			name: "amaica Kincaid",
		},
	};
});


// answerbook列表
// require("./answerbook.js");
router.get("/api/books", async (ctx, next) => {
	ctx.response.body = {
		status: "success",
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
});

// 加载首页的letters
// require("./answerbook.js");
//数据来源于https://lithub.com/how-many-of-the-100-most-famous-passages-in-literature-can-you-identify/
router.get("/api/loadletters", async (ctx, next) => {
	ctx.response.body = {
		status: "success",
		data: [
			{
				id: 123456,
				content:
					"It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
				subject: "A Tale of Two Cities",
				name: "Charles Dickens",
			},
			{
				id: 123457,
				content:
					"The only people for me are the mad ones, the ones who are mad to live, mad to talk, mad to be saved, desirous of everything at the same time, the ones who never yawn or say a commonplace thing, but burn, burn, burn like fabulous yellow roman candles exploding like spiders across the stars.",
				subject: "On The Road",
				name: "Jack Kerouac",
			},
		],
	};
});

// 刷新首页的letters
// require("./answerbook.js");
router.get("/api/updateletters", async (ctx, next) => {
	ctx.response.body = {
		status: "success",
		data: [
			{
				id: 123458,
				content:
					". . . this is how to make a good medicine for a cold; this is how to make a good medicine to throw away a child before it even becomes a child; this is how to catch a fish; this is how to throw back a fish you don’t like, and that way something bad won’t fall on you; this is how to bully a man; this is how a man bullies you; this is how to love a man; and if this doesn’t work there are other ways, and if they don’t work don’t feel too bad about giving up; this is how to spit up in the air if you feel like it, and this is how to move quick so that it doesn’t fall on you; this is how to make ends meet; always squeeze bread to make sure it’s fresh; but what if the baker won’t let me feel the bread?; you mean to say that after all you are really going to be the kind of woman who the baker won’t let near the bread?",
				subject: "Girl",
				name: "amaica Kincaid",
			},
			{
				id: 123459,
				content:
					"I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.",
				subject: "Dune",
				name: "Frank Herbert",
			},
			{
				id: 123460,
				content:
					"I wanted you to see what real courage is, instead of getting the idea that courage is a man with a gun in his hand. It’s when you know you’re licked before you begin, but you begin anyway and see it through no matter what.",
				subject: "To Kill a Mockingbird",
				name: "Harper Lee",
			},
		],
	};
});

router.get("/api/loadconversations/started", async (ctx, next) => {
	ctx.response.body = {
		status: "success",
		data: [
			{
				id: 10000,
				content: [
					{
						id: 123458,
						content:
							". . . this is how to make a good medicine for a cold; this is how to make a good medicine to throw away a child before it even becomes a child; this is how to catch a fish; this is how to throw back a fish you don’t like, and that way something bad won’t fall on you; this is how to bully a man; this is how a man bullies you; this is how to love a man; and if this doesn’t work there are other ways, and if they don’t work don’t feel too bad about giving up; this is how to spit up in the air if you feel like it, and this is how to move quick so that it doesn’t fall on you; this is how to make ends meet; always squeeze bread to make sure it’s fresh; but what if the baker won’t let me feel the bread?; you mean to say that after all you are really going to be the kind of woman who the baker won’t let near the bread?",
						subject: "Girl",
						name: "amaica Kincaid",
						time: "2021-06-28 16:28",
						type: 0,
					},
					{
						id: 123459,
						content:
							"I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.",
						subject: "Dune",
						name: "Frank Herbert",
						time: "2021-05-24 09:15",
						type: 1,
					},
				],
			},
			{
				id: 10001,
				content: [
					{
						id: 123460,
						content:
							"I wanted you to see what real courage is, instead of getting the idea that courage is a man with a gun in his hand. It’s when you know you’re licked before you begin, but you begin anyway and see it through no matter what.",
						subject: "To Kill a Mockingbird",
						name: "Harper Lee",
						time: "2021-06-24 16:48",
						type: 0,
					},
					{
						id: 123456,
						content:
							"It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
						subject: "A Tale of Two Cities",
						name: "Charles Dickens",
						time: "2021-07-02 15:05",
						type: 1,
					},
				],
			},
		],
	};
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
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(8090);
console.log("app started at port 8090...");
