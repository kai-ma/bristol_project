import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Layout from "./components/layouts";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor} from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
				<Layout />
			</PersistGate>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
