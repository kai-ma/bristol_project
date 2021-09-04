import React, { Component } from "react";
import { List, NavBar, Button, Toast } from "antd-mobile";
import { connect } from "react-redux";
import LetterContent from "@src/components/LetterContent";
import { getObjectFromLocalStorage, setObjectToLocalStorage } from "@src/utils";
import Http from "@src/utils/http.js";

class Letter extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
		let firstLetterId = this.props.match.params.id;
		let key = "home_replies_" + firstLetterId;
		let replies = getObjectFromLocalStorage(key);
		if (replies != null) {
			this.setState({ replies: replies });
		} else {
			Http({
				url:
					"/letter/home/replies/firstLetterId?firstLetterId=" +
					firstLetterId,
				method: "get",
				mock: false,
			}).then(
				(res) => {
					setObjectToLocalStorage(key, res);
					this.setState({ replies: res });
				},
				(err) => {
				}
			);
		}
	}

	initialState = {
		replies: [],
	};

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
		const { replies } = this.state;
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
						<LetterContent letter={letter}></LetterContent>
						{replies == null || replies.length === 0? (
							<div>
								{/* 空行 */}
								<List renderHeader={() => ""}></List>
								<Button
									type="primary"
									onClick={this.navToReply}
								>
									Reply
								</Button>
							</div>
						) : (
							<div>
								{replies.map((reply, index) => (
									<div key={index}>
										<LetterContent
											letter={reply}
										></LetterContent>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		letters: state.letter.letters,
	};
};

export default connect(mapStateToProps)(Letter);

//todo:刷新一下state就没有了。可以改成把Letter存到localStorage里，如果刷新的话，再更改。或者都写成loading的函数
//问题是如果这里设置成直接获取，一刷新就没有了。如果设置成重新取，那每次都得去取。感觉就是得存到localStorage里。
//只要刷新，就从localStorage中取，如果没有的话，再取数据库查。在点击更新的地方再重新从数据库里面查。

//小问题：(x) => x.id === this.props.match.params.id 一直报warning
