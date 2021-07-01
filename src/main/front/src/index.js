import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Layout from "./components/layouts";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<React.StrictMode>
				<App />
				<Layout />
			</React.StrictMode>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
