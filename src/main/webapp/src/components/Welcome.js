import React from "react";

import { Jumbotron } from "react-bootstrap";

class Welcome extends React.Component {
	render() {
		return (
			<Jumbotron className="bg-dark text-white">
				<h1>Welcome to Cure.</h1>
				<blockquote className="blockquote mb-0">
					{/* <p>Send your problems and get advice anonymously.</p> */}
					<footer className="blockquote-footer">
						Send your problems and get advice anonymously.
					</footer>
				</blockquote>
			</Jumbotron>
		);
	}
}

export default Welcome;
