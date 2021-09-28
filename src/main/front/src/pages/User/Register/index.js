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
import { register } from "@src/redux/actions/user";
import { connect } from "react-redux";
import Loading from "@src/components/Loading";

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
				Toast.fail(
					this.props.form.getFieldError(Object.keys(error)[0])
				);
				return;
			} else {
				this.props.register(value, this.props.history);
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
				{this.props.loading ? (
					<div>
						<Loading message={"Register..."}></Loading>
					</div>
				) : (
					<div>
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
								placeholder="6-16 characters"
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
						<List
							renderHeader={() => "Have account? Go to login"}
						></List>
						<Button
							type="primary"
							onClick={this.navToLogin}
							icon={<FaSignInAlt />}
						>
							Login
						</Button>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.user.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		register: (value, history) => dispatch(register(value, history)),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(createForm()(Register));
