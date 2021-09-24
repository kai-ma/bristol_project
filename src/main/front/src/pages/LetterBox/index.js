import React, { Component } from "react";
import { NavBar, Tabs, WhiteSpace, Badge, Card, WingBlank } from "antd-mobile";
import { connect } from "react-redux";
import { loadMyFirstLetters, loadFirstLettersIReplied, changeLetterBoxPage, changeUnread} from "../../redux/actions/letter";
import Loading from "../../components/Loading";

const tabs = [
	//todo： bage 可以设置为dot <Badge dot> 或者文本 <Badge text={"3"}> 显示角标
	{ title: <Badge text={""}>I sent</Badge> },
	{ title: <Badge text={""}>I replied</Badge> },
];

class LetterBox extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {
        //加载第一封信
        if(this.props.reloadMyFirstLetters){
            this.props.loadMyFirstLetters();
        }
	}

    initialState = {
        page: 0,
	};

    handleClickTab1 = (index) => {
        if(index !== this.props.page){
            this.props.changeLetterBoxPage(index);
        }
        if(this.props.reloadFirstLettersIReplied){
            this.props.loadFirstLettersIReplied();
        }
    }

    handleClickTab0 = (index) => {
        if(index !== this.props.page){
            this.props.changeLetterBoxPage(index);
        }
    }

    loadDetailISent = (letter, index) => {
        if(letter.unread > 0 ){
            this.props.changeUnread(this.props.unread - letter.unread);
        }
        letter.unread = 0;
        this.props.firstLettersIReplied[index] = letter;
        this.props.history.push("/letterbox/detail/" + letter.id);
    }

    loadDetailIReplied = (letter) => {
        this.props.history.push("/letterbox/reply/detail/" + letter.id);
    }

	render() {
		const myFirstLetters = this.props.myFirstLetters;
        const firstLettersIReplied = this.props.firstLettersIReplied;
        const {page} = this.props;
		return (
			<div>
				<NavBar mode="light">Letter Box</NavBar>
				<WhiteSpace />
				<div>
					<Tabs
						tabs={tabs}
						initialPage={page}
						onChange={(tab, index) => {
							// console.log("onChange", index, tab);
						}}
						onTabClick={(tab, index) => {
							// console.log("onTabClick", index, tab);
                            if(index == 1){
                                this.handleClickTab1(index);
                            }else if(index == 0){
                                this.handleClickTab0(index);
                            }
						}}
					>
                        {/* tab0 我发送的 */}
						<div>
							{this.props.loading ? (
								<div>
									<Loading></Loading>
								</div>
							) : (
								<div>
									{myFirstLetters.map((letter, index) => (
										<div key={index} className="card">
											<WingBlank size="lg">
												<WhiteSpace />
												<Card onClick={() =>this.loadDetailISent(letter, index)}>
													<Card.Header 
                                                        title={letter.title}
                                                    />
                                                    <WhiteSpace />
													<Card.Body>
														<div>
															{letter.content.substring(0,
																letter.content.length >100? 99: letter.content.length -1
															) + "..."}
														</div>
													</Card.Body>
                                                    <WhiteSpace />
                                                    <WhiteSpace />
													<Card.Footer
														content={letter.createdAt}
														extra={<div>{letter.replyNumber > 0 ?  letter.replyNumber + " replied" : null}
                                                        {letter.unread > 0 ?  " ," + letter.unread + " unread" : null}</div>
                                                    }
													/>
												</Card>
												<WhiteSpace />
											</WingBlank>
										</div>
									))}
								</div>
							)}
						</div>
                        {/* tab1 我回复的 */}
						<div>
							{this.props.loading ? (
								<div>
									<Loading></Loading>
								</div>
							) : (
								<div>
									{firstLettersIReplied.map((letter, index) => (
										<div key={index} className="card">
											<WingBlank size="lg">
												<WhiteSpace />
												<Card onClick={() =>this.loadDetailIReplied(letter)}>
													<Card.Header 
                                                        title={letter.title}
                                                        extra={letter.replyNumber > 0 ?  letter.replyNumber + " replied" : null}
                                                    />
                                                    <WhiteSpace />
													<Card.Body>
														<div>
															{letter.content.substring(0,
																letter.content.length >100? 99: letter.content.length -1
															) + "..."}
														</div>
													</Card.Body>
                                                    <WhiteSpace />
                                                    <WhiteSpace />
													<Card.Footer
														content={letter.createdAt}
														extra={<div>{letter.pseudonym}</div>}
													/>
												</Card>
												<WhiteSpace />
											</WingBlank>
										</div>
									))}
								</div>
							)}
						</div>
					</Tabs>
					<WhiteSpace />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		myFirstLetters: state.letter.myFirstLetters,
        firstLettersIReplied : state.letter.firstLettersIReplied,
		loading: state.letter.loading,
        reloadMyFirstLetters: state.letter.reloadMyFirstLetters,
		reloadFirstLettersIReplied: state.letter.reloadFirstLettersIReplied,
        page: state.letter.page,
        unread: state.letter.unread,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadMyFirstLetters: () => dispatch(loadMyFirstLetters()),
        loadFirstLettersIReplied: () => dispatch(loadFirstLettersIReplied()),
        changeLetterBoxPage : (page) => dispatch(changeLetterBoxPage(page)),
        changeUnread:(number) => dispatch(changeUnread(number)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(LetterBox);
