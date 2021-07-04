import React, { Component } from "react";
// import LetterCard from "../../components/LetterCard";
import { connect } from "react-redux";
import { updateLetters, loadLetters } from "../../redux/actions/letter";
//可以参考：https://www.freecodecamp.org/news/loading-data-in-react-redux-thunk-redux-saga-suspense-hooks-666b21da1569/
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
        this.load();
        // await this.props.loadLetters();
        // console.log(this.props);
		// const letters = this.props.letter;
		// const loading = this.props.loading;
		// if (letters != null) {
		// 	this.setState({
		// 		letters: letters,
		// 	});
		// }
	    // this.setState({
	    //     loading: loading
	    // });
	}


	load = () => {
		this.props.loadLetters();
		setTimeout(() => {
            console.log(this.props)
			const letters = this.props.letter;
			// const loading = this.props.loading;
			if (letters != null) {
				this.setState({
					letters: letters,
				});
			}
			// this.setState({
			// 	loading: loading,
			// });
		}, 1500);
	};

	handleClick = () => {
		this.props.updateLetters();
		console.log(this.props);
		const letters = this.props.letters;
		if (letters != null) {
			this.setState({
				letters: letters,
			});
		}
	};

	initialState = {
		letters: [],
	};

	render() {
		// const { shortContent, subject, name } = this.state.letters[0];
		// const { letters } = this.state;

        if (this.props.loading) {
            return <div>Loading</div>
        }else{
            console.log(this.state);
        }
        
        if (this.props.error) {
            return <div style={{ color: 'red' }}>ERROR: {this.props.error}</div>
        }
		return (
			<div>
				<h1> Welcome to cure!</h1>
				<div>
					{/* {loading ? <h1>Loading...</h1> : <h1>{letters.length}</h1>} */}
                    <h1 onClick={this.handleClick}>{this.props.letters.length}</h1>
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
		letters: state.letter.letters,
		loading: state.letter.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadLetters: () => dispatch(loadLetters()),
		updateLetters: () => dispatch(updateLetters())
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
