import "./App.css";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import AnswerBook from "./components/AnswerBook";
import Me from "./components/Me";
import Footer from "./components/Footer";
import Register from "./components/User/Register";
import Login from "./components/User/Login";

function App() {
	const marginTop = {
		marginTop: "20px",
	};

	return (
		<Router>
			<NavigationBar />
			<Container>
				<Row>
					<Col lg={12} style={marginTop}>
						<Switch>
							<Route path="/" exact component={Welcome} />
							<Route path="/home" exact component={Home} />
							<Route
								path="/answerbook"
								exact
								component={AnswerBook}
							/>
							<Route path="/me" exact component={Me} />
							<Route
								path="/register"
								exact
								component={Register}
							/>
							<Route path="/login" exact component={Login} />
							<Route path="/logout" exact component={Login} />
						</Switch>
					</Col>
				</Row>
			</Container>
			<Footer />
		</Router>
	);
}

export default App;
