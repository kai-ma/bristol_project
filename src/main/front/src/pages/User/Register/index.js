import React, { Component } from "react";
import {
	List,
	InputItem,
	NavBar,
	Button,
	WhiteSpace,
	Toast,
} from "antd-mobile";
import { createForm } from "rc-form";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Http from "@src/utils/http.js";

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {}

	initialState = {};

	handleSubmit = () => {
		const input = this.props.form.getFieldsValue();
		if (input.confirm_password !== input.password) {
			Toast.fail("Confirmation password is not identical.", 1);
			return;
		}
		this.props.form.validateFields((error, value) => {
			if (error) {
				Toast.info(
					this.props.form.getFieldError(Object.keys(error)[0])
				);
				return;
			} else {
				Http({ url: "/auth/register", body: value, mock: false }).then(
					(res) => {
						console.log(res);
						Toast.info(
							"Register successfully!",
							1,
							this.props.history.push("/login")
						);
					},
					(err) => {
                        if(err.errMsg != null){
                            Toast.fail(err.errMsg, 2);
                        }else{
                            Toast.fail("Network error, please try again", 2);
                        }
					}
				);
			}
		});
	};

	navToLogin = () => {
		this.props.history.push("/login");
	};

	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div>
				<NavBar mode="light">Register</NavBar>
				<List renderHeader={() => ""}>
					<InputItem
						{...getFieldProps("pseudonym", {
							rules: [{ required: true }],
						})}
						labelNumber={6}
						placeholder="pseudonym"
					>
						Pseudonym
					</InputItem>

					<InputItem
						{...getFieldProps("email", {
							rules: [{ required: true }],
						})}
						labelNumber={6}
						placeholder="email"
					>
						Email
					</InputItem>
					<InputItem
						{...getFieldProps("password", {
							rules: [{ required: true }],
						})}
						type="password"
						placeholder="********"
						labelNumber={6}
					>
						Password
					</InputItem>
					<InputItem
						{...getFieldProps("confirm_password", {
							rules: [{ required: true }],
						})}
						placeholder="confirm password"
						type="password"
						labelNumber={6}
					>
						Confirm
					</InputItem>
				</List>
				<WhiteSpace size="xl" />
				<Button
					type="primary"
					onClick={this.handleSubmit}
					icon={<FaUserPlus />}
				>
					Register
				</Button>
				<List renderHeader={() => "Have account? Go to login"}></List>
				<Button
					type="primary"
					onClick={this.navToLogin}
					icon={<FaSignInAlt />}
				>
					Login
				</Button>
			</div>
		);
	}
}

export default createForm()(Register);
