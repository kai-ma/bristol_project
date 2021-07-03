import React, { Component } from "react";
import { Grid, WingBlank, WhiteSpace } from "antd-mobile";
import { withRouter } from "react-router-dom";
import get from "@src/fetch/get.js";

class Category extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = { books: [] };

	handleClick = (data) => {
		console.log(data);
		const index = data.index;
		return this.props.history.push("/answerbook/content" + index);
	};

	// async componentDidMount() {
	// 	let books = await Http({ url: "/books", method: "get" });
	//     console.log("22" + books);
	// 	this.setState({ books: books });
	// 	console.log("24" + this.state.books);
	// }

	componentWillMount() {}

	componentDidMount() {
		const result = get("/api/books");
		result
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				// 处理获取的数据
                console.log(json);
				const books = json.bookList;
				if (books.length) {
					this.setState({
						books: books,
					});
				}
				console.log(this.state.books);
			})
			.catch((ex) => {
				// 发生错误
				// if (__DEV__) {
				console.error("首页广告模块获取数据报错, ", ex.message);
				// }
			});

		// console.log("22" + books);
		// this.setState({ books: books });
		// console.log("24" + this.state.books);
	}

	render() {
		const data = Array.from(new Array(2)).map((_val, i) => ({
			icon: "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
			text: `name${i}`,
			index: i,
		}));
		console.log(data);

		// const invokeHttp = async () => {
		// 	const result = await Http({ url: "/books", method: "get" });
		// 	return result;
		// };

		// const books = await invokeHttp();

		return (
			<div>
				<WingBlank size="lg">
					<WhiteSpace size="lg" />
					{/* 
                    <div className="sub-title">Grid item adjust accroiding to img size </div>
    <Grid data={data} square={false} className="not-square-grid" /> */}

					<div className="sub-title">ColumnNum=3 </div>

					{this.state.books ? (
						<Grid
							// data={data}
							data={this.state.books}
							onClick={(data) => this.handleClick(data)}
						/>
					) : (
						<div>{/* 加载中... */}</div>
					)}

					<WhiteSpace size="lg" />
				</WingBlank>

				<WhiteSpace size="xl" />
				<WhiteSpace size="xl" />
			</div>
		);
	}
}

export default withRouter(Category);
