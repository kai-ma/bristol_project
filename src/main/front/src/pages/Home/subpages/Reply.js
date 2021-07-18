import React, { Component } from "react";
import {
	List,
	TextareaItem,
	InputItem,
	NavBar,
	Button,
	Switch,
	Toast,
	WhiteSpace,
} from "antd-mobile";
import { createForm } from "rc-form";
import { connect } from "react-redux";
import Http from "@src/utils/http.js";

class Reply extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {}

	initialState = {};

	handleSubmit = (letter) => {
		const input = this.props.form.getFieldsValue();

		// console.log(input);
		this.props.form.validateFields((error, value) => {
			if (error) {
				Toast.info(
					this.props.form.getFieldError(Object.keys(error)[0])
				);
				return;
			} else {
                //回信 type是0
				Http({ url: "/letter/reply", body: { ...value, firstLetterId: letter.id, type:0}, mock: false }).then(
					(res) => {
						Toast.info("Reply successfully!", 2);
						setTimeout(() => {
							this.props.history.push("/");
						}, 2000);
					},
					(err) => {
                        if(err.errCode === 30002){
                            Toast.fail(err.errMsg, 2);
                        }else{
                            Toast.info("Network error, please try again", 2);
                        }
                    }
				);
			}
		});
	};

	linkToHome = () => {
		this.props.history.push("/");
	};

	render() {
		const letter = this.props.letters.find(
			(x) => x.id == this.props.match.params.id
		);
		const { getFieldProps } = this.props.form;
		const Item = List.Item;
		return (
			<div>
				<NavBar
					leftContent="Home"
					mode="light"
					onLeftClick={this.linkToHome}
				>
					Reply
				</NavBar>

				{letter == null ? (
					<div>{this.showMessage("Please try again")}</div>
				) : (
					<div>
						<List className="short content">
							<Item wrap disabled>
								<div>
									{letter.content.substring(
										0,
										letter.content.length > 100
											? 99
											: letter.content.length - 1
									) + "..."}
								</div>
							</Item>
						</List>
					</div>
				)}

				<WhiteSpace size="lg" />

				<List renderHeader={() => "Content"}>
					<TextareaItem
						{...getFieldProps("content", {
							initialValue: "",
							rules: [{ required: true }],
						})}
						rows={8}
						count={1000}
						placeholder="Give advice or warmth to strangers"
					/>
				</List>
				<List renderHeader={() => ""}></List>
				<Button type="primary" onClick={() => this.handleSubmit(letter)}>
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
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(createForm()(Reply));
