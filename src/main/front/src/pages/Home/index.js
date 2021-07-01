import React, { Component } from "react";
import LetterCard from "../../components/LetterCard";
import { connect } from "react-redux";
import { update, load } from "../../redux/actions/letter";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	// componentDidMount() {
	// 	this.props.load();
	//     let letter = this.props.letter;
	//     if(letter!==null){
	//         this.setState({
	//             shortContent: letter.shortContent,
	// 			subject: letter.subject,
	// 			name: letter.name,
	//         });
	//     }
	// }

	componentDidMount = () => {
		const letter = {
			shortContent: "改变",
			subject: "主题",
			name: "姓名",
		};
        this.props.update(letter);
		setTimeout(() => {
            let letter = this.props.letter;
			if (letter !== null) {
				this.setState({
					shortContent: letter.shortContent,
					subject: letter.subject,
					name: letter.name,
				});
			}
		}, 3000);
	};

	initialState = {
		shortContent: "改变之前",
		subject: "主题",
		name: "姓名",
	};

	handleClick = () => {
		console.log("click");
		return this.props.history.push("/user");
	};

	render() {
		const { shortContent, subject, name } = this.state;
		console.log(shortContent);
		return (
			<div>
				<h1> Welcome to cure!</h1>

				<LetterCard
					shortContent={shortContent}
					subject={subject}
					name={name}
				></LetterCard>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		letter: state.letter,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		update: (letter) => dispatch(update(letter)),
		load: () => dispatch(load()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
