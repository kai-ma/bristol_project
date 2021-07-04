import React, { Component } from "react";
import LetterCard from "../../components/LetterCard";
import { connect } from "react-redux";
import { loadLetters } from "../../redux/actions/letter";

class Home extends Component {
	constructor(props) {
		super(props);
        console.log("init props");
        console.log(this.props);
		this.state = this.initialState;
	}

	componentDidMount() {
        this.load();
	}

    load = async () => {
        await this.props.loadLetters();
        const letters = this.props.letters;
        if (letters != null) {
			console.log(letters);
			this.setState({
				letters: letters,
			});
		}
    }

    handleClick = async () => {
        console.log("starting")
		await this.props.loadLetters();
        console.log(this.props);
        const letters = this.props.letters;
        if (letters != null) {
			console.log(letters);
			this.setState({
				letters: letters,
			});
		}
        console.log("finishing")
	};

	initialState = {
		letters: [],
	};

	render() {
		// const { shortContent, subject, name } = this.state.letters[0];
		const { letters } = this.state;

		console.log(this.state);
		return (
			<div>
				<h1> Welcome to cure!</h1>
				<div>
					{letters.length === 0 ? (
						<p1 onClick={this.handleClick}>No Books Available.</p1>
					) : (
						<p1 >{letters.length}</p1>
					)}
				</div>
				{/* <LetterCard
					shortContent={shortContent}
					subject={subject}
					name={name}
				></LetterCard> */}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		letters: state.letters,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadLetters: () => dispatch(loadLetters()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
