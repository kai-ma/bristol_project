import React, { Component } from "react";
import { connect } from "react-redux";
import { updateLetters, loadLetters } from "../../redux/actions/letter";
//redux可以参考：https://www.freecodecamp.org/news/loading-data-in-react-redux-thunk-redux-saga-suspense-hooks-666b21da1569/
import { BsPencilSquare } from "react-icons/bs";
import "./index.css";
import { Card, WingBlank, WhiteSpace, Button } from "antd-mobile";

import Loading from "../../components/Loading";
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
		if (this.props.reLoadLetters) {
			this.props.loadLetters();
		}
	}

	updateLetters = () => {
		console.log("updateLetters");
		this.props.updateLetters();
		console.log(this.props);
		const letters = this.props.letters;
		if (letters != null) {
			this.setState({
				letters: letters,
			});
		}
	};

	writeLetter = () => {
		this.props.history.push("/send");
	};

    navToAnswerBook = () => {
        this.props.history.push("/answerbook");
    }

	initialState = {
		letters: [],
	};

	handleClick = (letter) => {
		// console.log(letter);
		this.props.history.push("/letter/" + letter.id);
	};

	render() {
		// if (this.props.error) {
		// 	return (
		// 		<div style={{ color: "red" }}>ERROR: {this.props.error}</div>
		// 	);
		// }

		const letters = this.props.letters;

		return (
			<div>
				<div>
					<h2 className="pull-left">Welcome to Cure</h2>
				</div>
				{/* 根据loading判读是否显示loading图标 */}
				{this.props.loading ? (
					<div>
						<Loading></Loading>
					</div>
				) : (
					<div>
						{/* 参考：https://www.robinwieruch.de/react-state-array-add-update-remove */}
						{letters.map((letter, index) => (
							<div key={index}>
								<WingBlank size="lg">
									<WhiteSpace />
									<Card
										onClick={() => this.handleClick(letter)}
									>
										<Card.Header title={letter.title} />
                                        <WhiteSpace />
										<Card.Body>
											<div>
												{letter.content.substring(
													0,
													letter.content.length > 100
														? 99
														: letter.content
																.length - 1
												) + "..."}
											</div>
										</Card.Body>
                                        <WhiteSpace />
                                        <WhiteSpace />
										<Card.Footer
											content={letter.createdAt}
											extra={
												<div>{letter.pseudonym}</div>
											}
										/>
									</Card>
									{index < letters.length - 1 ? (
										<div>
											<WhiteSpace />
										</div>
									) : (
										<div></div>
									)}
								</WingBlank>
							</div>
						))}
                        <WhiteSpace />
						<WingBlank>
							<Button
								icon={<BsPencilSquare />}
								size="large"
								style={{ marginRight: "2px" }}
								// style={{float:"right",marginBottom:10}}
								onClick={this.writeLetter}
							>
								write letter
							</Button>
						</WingBlank>
                        <p className="p" onClick={this.navToAnswerBook}>See more? </p>
                        <WhiteSpace />
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		letters: state.letter.letters,
		loading: state.letter.loading,
		reLoadLetters: state.letter.reLoadLetters,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadLetters: () => dispatch(loadLetters()),
		updateLetters: () => dispatch(updateLetters()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

//todo:从写信页面返回这个页面的时候会重新调用componentDidMount
//card还可以加头像等，具体看antd-mobile的card教程
