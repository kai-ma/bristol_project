import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Conversations from "./pages/Conversations";
import AnswerBook from "./pages/AnswerBook";
import User from "./pages/User";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Content from "./pages/AnswerBook/subpages/Content";


function App() {
	return (
		<div>
			{/* 前后可以加载一些公用的内容 */}
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/conversations" exact component={Conversations} />
				<Route path="/answerbook" exact component={AnswerBook} />
				<Route path="/user" exact component={User} />
				<Route path="/register" exact component={Register} />
				<Route path="/login" exact component={Login} />
                <Route path="/answerbook/content*" exact component={Content} />
				{/* 其他所有的url都到home页面 */}
				<Route path="/*" exact component={Home} />
			</Switch>
		</div>
	);
}

export default App;
