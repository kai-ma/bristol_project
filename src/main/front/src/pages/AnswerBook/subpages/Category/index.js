import React, { Component } from "react";
import { Grid, WingBlank, WhiteSpace, Toast } from "antd-mobile";
import { withRouter } from "react-router-dom";
import Http from "@src/utils/http.js";
import Loading from "../../../../components/Loading";
class Category extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = { topics: [], loadTopics: true };

	handleClick = (data) => {
		const id = data.id;
		return this.props.history.push("/answerbook/content/" + id);
	};

    //todo，把这个和写信页面的提取成公用的redux的
	componentDidMount() {
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
					this.setState({ topics: res });
				},
				(err) => {
					Toast.info("Network error, please try again", 2);
				}
			);
		} else {
			this.setState({ topics: JSON.parse(topicString) });
		}
	}

	render() {
		return (
			<div>
				<WingBlank size="lg">
					<WhiteSpace size="lg" />
					{/* 
                    <div className="sub-title">Grid item adjust accroiding to img size </div>
    <Grid data={data} square={false} className="not-square-grid" /> */}


					{this.state.topics ? (
						<Grid
							data={this.state.topics}
							onClick={(data) => this.handleClick(data)}
                            columnNum={3}
						/>
					) : (
						<div>
							<Loading></Loading>
						</div>
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
//todo:宫格的大小，屏幕如果比较窄的话，显示不出来所有字。
