import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserPlus,
	faSignInAlt,
	faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../services/index";

class NavigationBar extends Component {
	logout = () => {
		this.props.logoutUser();
	};
	render() {
		const guestLinks = (
			<>
				<div className="mr-auto"></div>
				<Nav className="navbar-right">
					<Link to={"register"} className="nav-link">
						<FontAwesomeIcon icon={faUserPlus} /> Register
					</Link>
					<Link to={"login"} className="nav-link">
						<FontAwesomeIcon icon={faSignInAlt} /> Login
					</Link>
				</Nav>
			</>
		);
		const userLinks = (
			<>
				<Nav className="mr-auto">
					<Link to={"home"} className="nav-link">
						Home
					</Link>
					<Link to={"answerbook"} className="nav-link">
						Answerbook
					</Link>
					<Link to={"me"} className="nav-link">
						Me
					</Link>
				</Nav>
				<Nav className="navbar-right">
					<Link
						to={"logout"}
						className="nav-link"
						onClick={this.logout}
					>
						<FontAwesomeIcon icon={faSignOutAlt} /> Logout
					</Link>
				</Nav>
			</>
		);

		return (
			<Navbar bg="dark" variant="dark">
				<Link to={""} className="navbar-brand">
					{/* <img
						src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png"
						width="25"
						height="25"
						alt="brand"
					/>{" "} */}
					Cure
				</Link>
				{this.props.auth.isLoggedIn ? userLinks : guestLinks}
			</Navbar>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logoutUser: () => dispatch(logoutUser()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
