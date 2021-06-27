import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Layout from "./layouts";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<BrowserRouter>
		<React.StrictMode>
			<App />
			<Layout />
		</React.StrictMode>
	</BrowserRouter>,
	document.getElementById("root")
);