import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import LetterBox from "./pages/LetterBox";
import AnswerBook from "./pages/AnswerBook";
import User from "./pages/User";
import Register from "./pages/User/Register";
import Login from "./pages/User/Login";
import AnswerContent from "./pages/AnswerBook/subpages/Content";
import Send from "./pages/Home/subpages/Send"
import Reply from "./pages/Home/subpages/Reply"
import Letter from "./pages/Home/subpages/Letter"
import Conversation from "./pages/LetterBox/Conversation"
import PrivateRoute from './router/PrivateRoute';

function App() {
	return (
		<div>
			{/* 前后可以加载一些公用的内容 */}
			<Switch>
				<Route path="/" exact component={Home} />
				<PrivateRoute path="/letterbox" exact component={LetterBox} />
				<PrivateRoute path="/conversation/:id" exact component={Conversation} />
				<PrivateRoute path="/answerbook" exact component={AnswerBook} />
				<PrivateRoute path="/user" exact component={User} />
                <PrivateRoute path="/send" exact component={Send} />
                <PrivateRoute path="/reply/:id" exact component={Reply} />
                <PrivateRoute path="/letter/:id" exact component={Letter} />
				<Route path="/register" exact component={Register} />
				<Route path="/login/:router?" exact component={Login} />
                <PrivateRoute path="/answerbook/content*" exact component={AnswerContent} />
				{/* 其他所有的url都到home页面 */}
				<Route path="/*" exact component={Home} />
			</Switch>
		</div>
	);
}

export default App;
