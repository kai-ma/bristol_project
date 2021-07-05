import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Conversations from "./pages/Conversations";
import AnswerBook from "./pages/AnswerBook";
import User from "./pages/User";
import Register from "./pages/User/Register";
import Login from "./pages/User/Login";
import AnswerContent from "./pages/AnswerBook/subpages/Content";
import Send from "./pages/Home/subpages/Send"
import Reply from "./pages/Home/subpages/Reply"
import Letter from "./pages/Home/subpages/Letter"


function App() {
	return (
		<div>
			{/* 前后可以加载一些公用的内容 */}
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/conversations" exact component={Conversations} />
				<Route path="/answerbook" exact component={AnswerBook} />
				<Route path="/user" exact component={User} />
                <Route path="/send" exact component={Send} />
                <Route path="/reply/:id" exact component={Reply} />
                <Route path="/letter/:id" exact component={Letter} />
				<Route path="/register" exact component={Register} />
				<Route path="/login/:router?" exact component={Login} />
                <Route path="/answerbook/content*" exact component={AnswerContent} />
				{/* 其他所有的url都到home页面 */}
				<Route path="/*" exact component={Home} />
			</Switch>
		</div>
	);
}

export default App;
