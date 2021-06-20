import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import MyToast from "./MyToast";
import {
	Row,
	Col,
	Card,
	Form,
	InputGroup,
	FormControl,
	Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEnvelope,
	faLock,
	faUndo,
	faUserPlus,
	faUser,
} from "@fortawesome/free-solid-svg-icons";

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.state.show = false;
		this.register = this.register.bind(this);
	}

	initialState = {
		username: "",
		email: "",
		password: "",
	};

	userChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	resetRegisterForm = () => {
		this.setState(() => this.initialState);
	};

	register = (event) => {
		event.preventDefault();

		const user = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
		};

		axios
			.post("http://localhost:8080/user/register", qs.stringify(user))
			.then((response) => {
				if (response.data != null) {
					this.setState({ show: true });
					setTimeout(() => {
						this.setState({ show: false });
						this.props.history.push("/login");
					}, 1000);
				} else {
					this.setState({ show: false });
				}
			});

		this.setState(this.initialState);
	};

	render() {
		const { username, email, password } = this.state;

		return (
			<div>
				<div style={{ display: this.state.show ? "block" : "none" }}>
					<MyToast
						children={{
							show: this.state.show,
							message: "Registered Successfully.",
						}}
					/>
				</div>
				<Row className="justify-content-md-center">
					<Col xs={5}>
						<Card
							className={"border border-dark bg-dark text-white"}
						>
							<Card.Header>
								<FontAwesomeIcon icon={faUserPlus} /> Register
							</Card.Header>
							<Card.Body>
								<Form.Row>
									<Form.Group as={Col}>
										<InputGroup>
											<InputGroup.Prepend>
												<InputGroup.Text>
													<FontAwesomeIcon
														icon={faUser}
													/>
												</InputGroup.Text>
											</InputGroup.Prepend>
											<FormControl
												required
												autoComplete="off"
												type="text"
												name="username"
												value={username}
												onChange={this.userChange}
												className={"bg-dark text-white"}
												placeholder="Enter Name"
											/>
										</InputGroup>
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Form.Group as={Col}>
										<InputGroup>
											<InputGroup.Prepend>
												<InputGroup.Text>
													<FontAwesomeIcon
														icon={faEnvelope}
													/>
												</InputGroup.Text>
											</InputGroup.Prepend>
											<FormControl
												required
												autoComplete="off"
												type="text"
												name="email"
												value={email}
												onChange={this.userChange}
												className={"bg-dark text-white"}
												placeholder="Enter Email Address"
											/>
										</InputGroup>
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Form.Group as={Col}>
										<InputGroup>
											<InputGroup.Prepend>
												<InputGroup.Text>
													<FontAwesomeIcon
														icon={faLock}
													/>
												</InputGroup.Text>
											</InputGroup.Prepend>
											<FormControl
												required
												autoComplete="off"
												type="password"
												name="password"
												value={password}
												onChange={this.userChange}
												className={"bg-dark text-white"}
												placeholder="Enter Password"
											/>
										</InputGroup>
									</Form.Group>
								</Form.Row>
							</Card.Body>
							<Card.Footer style={{ "text-align": "right" }}>
								<Button
									size="sm"
									type="button"
									variant="success"
									disabled={
										this.state.email.length === 0 ||
										this.state.password.length === 0
									}
									onClick={this.register}
								>
									<FontAwesomeIcon icon={faUserPlus} />{" "}
									Register
								</Button>{" "}
								<Button
									size="sm"
									type="button"
									variant="info"
									onClick={this.resetRegisterForm}
								>
									<FontAwesomeIcon icon={faUndo} /> Reset
								</Button>
							</Card.Footer>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}
