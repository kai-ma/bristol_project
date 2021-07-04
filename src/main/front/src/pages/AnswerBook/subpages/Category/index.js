import React, { Component } from "react";
import { Grid, WingBlank, WhiteSpace } from "antd-mobile";
import { withRouter } from "react-router-dom";
import Http from "@src/fetch/http.js";
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

	componentWillMount() {}

	componentDidMount() {
        Http({url : "/books", method: "get"}).then(res => {
            this.setState({
                books: res,
            });
        },err =>{
            console.log(err)
        });
	}

	render() {
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
