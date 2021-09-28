import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import LetterBox from "./pages/LetterBox";
import SendDetail from "./pages/LetterBox/subpages/SendDetail";
import ReplyDetail from "./pages/LetterBox/subpages/ReplyDetail";
import AnswerBook from "./pages/AnswerBook";
import AnswerBookContent from "./pages/AnswerBook/subpages/Content";
import AnswerBookConversation from "./pages/AnswerBook/subpages/Conversation"
import User from "./pages/User";
import Register from "./pages/User/Register";
import Login from "./pages/User/Login";
import Settings from "./pages/User/subpages/Settings"
import Send from "./pages/Home/subpages/send"
import Reply from "./pages/Home/subpages/reply"
import Letter from "./pages/Home/subpages/letter"
import Feedback from "./pages/User/subpages/Feedback";
import PrivateRoute from './router/PrivateRoute';
import ReplyToMe from "./pages/LetterBox/subpages/ReplyToMe";
import Report from "./pages/LetterBox/subpages/Report";
import Recommend from "./pages/LetterBox/subpages/Recommend";
import Stamp from "./pages/User/subpages/Stamp";

function App() {
	return (
		<div>
			{/* 前后可以加载一些公用的内容 */}
			<Switch>
				<PrivateRoute path="/" exact component={Home} />
				<PrivateRoute path="/letterbox" exact component={LetterBox} />
                <PrivateRoute path="/letterbox/detail/:id" exact component={SendDetail} />
                <PrivateRoute path="/letterbox/reply/detail/:id" exact component={ReplyDetail} />
                <PrivateRoute path="/letterbox/replytome" exact component={ReplyToMe} />
                <PrivateRoute path="/feedback" exact component={Feedback} />
                <PrivateRoute path="/report" exact component={Report} />
                <PrivateRoute path="/recommend" exact component={Recommend} />
				<PrivateRoute path="/answerbook" exact component={AnswerBook} />
                <PrivateRoute path="/answerbook/content/:id" exact component={AnswerBookContent} />
                <PrivateRoute path="/answerbook/conversation" exact component={AnswerBookConversation} />
				<PrivateRoute path="/user" exact component={User} />
                <PrivateRoute path="/send" exact component={Send} />
                <PrivateRoute path="/reply/:id" exact component={Reply} />
                <PrivateRoute path="/letter/:id" exact component={Letter} />
                <PrivateRoute path="/settings" exact component={Settings} />
                <PrivateRoute path="/stamp" exact component={Stamp} />
				<Route path="/register" exact component={Register} />
				<Route path="/login/:router?" exact component={Login} />
				{/* 其他所有的url都到home页面 */}
				<Route path="/*" exact component={Home} />
			</Switch>
		</div>
	);
}

export default App;
