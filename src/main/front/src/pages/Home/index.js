import React, { Component } from "react";
import { connect } from "react-redux";
import { updateLetters, loadLetters } from "../../redux/actions/letter";
//redux可以参考：https://www.freecodecamp.org/news/loading-data-in-react-redux-thunk-redux-saga-suspense-hooks-666b21da1569/
import { BsPencilSquare } from "react-icons/bs";

import {
	Card,
	WingBlank,
	WhiteSpace,
	ActivityIndicator,
	Button,
} from "antd-mobile";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
        console.log("componentDidMount");
		this.props.loadLetters();
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
    }

	initialState = {
		letters: [],
	};

    handleClick = (letter) => {
        // console.log(letter);
        this.props.history.push("/letter/" + letter.id);
    }

	render() {
		// if (this.props.error) {
		// 	return (
		// 		<div style={{ color: "red" }}>ERROR: {this.props.error}</div>
		// 	);
		// }

		const letters = this.props.letters;

		return (
			<div>
				<h1> Welcome to cure!</h1>
				{/* 根据loading判读是否显示loading图标 */}
				{this.props.loading ? (
					<div>
						<ActivityIndicator
							toast
							text="Loading..."
							size="small"
						/>
					</div>
				) : (
					<div>
						<p onClick={this.updateLetters}>
							{this.props.letters.length}
							letters
						</p>
						{letters.map((letter, index) => (
							<div key={index}>
								<WingBlank size="lg">
									<WhiteSpace size="lg" />
									<Card onClick={() => this.handleClick(letter)}>
										<Card.Header title={letter.subject} />
										<Card.Body>
											<WhiteSpace size="lg" />
											<div>{letter.content.substring(0, letter.content.length > 100 ? 99 : letter.content.length - 1) + "..."}</div>
											<WhiteSpace size="lg" />
										</Card.Body>
										<Card.Footer
											// content="left footer"
											extra={<div>{letter.name}</div>}
										/>
									</Card>
									<WhiteSpace size="lg" />
								</WingBlank>
							</div>
						))}
						<WingBlank >
							<Button
								icon={<BsPencilSquare/>}
								inline
								size="large"
								style={{ marginRight: "2px" }}
                                // style={{float:"right",marginBottom:10}}
                                onClick={this.writeLetter}
							>
								write letter
							</Button>
						</WingBlank>

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
