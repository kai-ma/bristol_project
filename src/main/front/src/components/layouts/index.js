import Menu from "../Menu";
import { useLocation } from "react-router-dom";
import { WhiteSpace } from "antd-mobile";

function Layout(props) {
	const location = useLocation();
	const paths = ["/", "/user", "/letterbox", "/answerbook", "/login", "/register"];

	return (
		<div>
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
			<WhiteSpace size="lg" />
			<Menu
				show={paths.includes(location.pathname)}
				pathname={location.pathname}
			/>
		</div>
	);
}

export default Layout;
