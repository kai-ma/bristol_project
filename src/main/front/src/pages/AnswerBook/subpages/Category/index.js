import React, { Component } from "react";
import { Grid, WingBlank, WhiteSpace, Toast } from "antd-mobile";
import { withRouter } from "react-router-dom";
import Http from "@src/utils/http.js";
import Loading from "../../../../components/Loading";
import { getTopics } from "../../../../utils/functions";
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

	componentDidMount() {
		let topics = getTopics();
		if (topics != null && topics.length > 0) {
			this.setState({
				topics: topics,
				loadTopics: false,
			});
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

					{/* <div className="sub-title">ColumnNum=3 </div> */}

					{this.state.topics ? (
						<Grid
							data={this.state.topics}
							onClick={(data) => this.handleClick(data)}
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
