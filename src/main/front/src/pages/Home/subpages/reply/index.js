import React, { Component } from "react";
import {
	List,
	TextareaItem,
	NavBar,
	Button,
	Toast,
	WhiteSpace,
	WingBlank,
	Modal,
} from "antd-mobile";
import { createForm } from "rc-form";
import { connect } from "react-redux";
import { reply } from "@src/redux/actions/letter";
import { BsPencilSquare } from "react-icons/bs";

const alert = Modal.alert;

class Reply extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {}

	initialState = {};

	handleSubmit = (letter) => {
		this.props.form.validateFields((error, value) => {
			if (error) {
				Toast.info(
					this.props.form.getFieldError(Object.keys(error)[0])
				);
				return;
			} else {
				alert("Confirm reply", "Cost 1 stamp to reply", [
					{
						text: "Confirm",
						onPress: () => {
							this.props.reply(letter, value, this.props.history);
						},
					},
					{
						text: "Cancel",
						onPress: () => console.log("cancel"),
					},
				]);
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
						rows={12}
						count={1500}
						placeholder="- Read the thoughts carefully to understand the emotions behind them.
                        - Take your time to think before your respond.
                        - Your words matter. Use them to show support.
                        - Try to be as honest and open-minded as possible.
                        - Personal responses go a long way in keeping the community kind, loving and empathetic."
					/>
				</List>
				<List renderHeader={() => ""}></List>
				<Button
					type="primary"
					onClick={() => this.handleSubmit(letter)}
					style={{ marginRight: "2px" }}
					icon={<BsPencilSquare />}
				>
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
	return {
		reply: (letter, value, history) =>
			dispatch(reply(letter, value, history)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(createForm()(Reply));
