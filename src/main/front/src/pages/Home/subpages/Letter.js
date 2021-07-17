import React, { Component } from "react";
import { List, NavBar, Button, Toast, WingBlank, Card, WhiteSpace } from "antd-mobile";
import { connect } from "react-redux";
// import { loadLetters } from "../../../redux/actions/letter";

class Letter extends Component {
	constructor(props) {
		super(props);
        console.log(this.props);
		this.state = this.initialState;
	}

	componentDidMount() {
		console.log("componentDidMount");
        console.log(this.props);
	}

	initialState = {};

	navToHome = () => {
		this.props.history.push("/");
	};

	navToReply = () => {
        this.props.history.push("/reply/" + this.props.match.params.id);
    };

	showMessage = (message) => {
		Toast.fail(message);
	};

	render() {
		const letter = this.props.letters.find(
			(x) => x.id == this.props.match.params.id
		);
		// console.log(letter);

		return (
			<div>
				<NavBar
					leftContent="Home"
					mode="light"
					onLeftClick={this.navToHome}
				>
					Content
				</NavBar>

				{letter == null ? (
					<div>{this.showMessage("Please try again")}</div>
				) : (
					<div>
						<WingBlank size="lg">
							<WhiteSpace size="lg" />
							<Card>
								<Card.Header title={letter.title} />
								<Card.Body>
									<WhiteSpace size="lg" />
									<div>
										{letter.content}
									</div>
									<WhiteSpace size="lg" />
								</Card.Body>
								<Card.Footer
									// content="left footer"
									extra={<div>{letter.pseudonym}</div>}
								/>
							</Card>
							<WhiteSpace size="lg" />
						</WingBlank>
					</div>
				)}

				{/* 空行 */}
				<List renderHeader={() => ""}></List>
				<Button type="primary" onClick={this.navToReply}>
					Reply
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		letters: state.letter.letters,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Letter);

//todo:刷新一下state就没有了。可以改成把Letter存到localStorage里，如果刷新的话，再更改。或者都写成loading的函数
//问题是如果这里设置成直接获取，一刷新就没有了。如果设置成重新取，那每次都得去取。感觉就是得存到localStorage里。
//只要刷新，就从localStorage中取，如果没有的话，再取数据库查。在点击更新的地方再重新从数据库里面查。


//小问题：(x) => x.id === this.props.match.params.id 一直报warning