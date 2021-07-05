import React, { Component } from "react";
import { Button, List, WhiteSpace } from "antd-mobile";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

export default class User extends Component {

    constructor(props) {
		super(props);
		this.state = this.initialState;
	}


    navToLogin = () => {
        this.props.history.push("/login");
    }

    navToRegister = () => {
        this.props.history.push("/register");
    }
    
	render() {
		return (
			<div>
                <WhiteSpace size="xl" />
				<Button
					type="primary"
					onClick={this.navToLogin}
					icon={<FaSignInAlt />}
				>
					Login
				</Button>
				<WhiteSpace size="xl" />
				<Button
					type="primary"
					onClick={this.navToRegister}
					icon={<FaUserPlus />}
				>
					Register
				</Button>
			</div>
		);
	}
}
