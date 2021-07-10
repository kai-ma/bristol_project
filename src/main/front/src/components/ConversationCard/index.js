import React, { Component } from "react";
import { WhiteSpace, Card, WingBlank } from "antd-mobile";
import { withRouter } from 'react-router-dom';

class ConversationCard extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {};

	handleClick = () => {
		console.log("click");
		this.props.history.push("/conversation/" +  this.props.conversation.id);
	};

	render() {
		const { conversation, type } = this.props;
		return (
			<div>
				<div>
					{conversation.content.map((letter, index) => (
						<div key={index}>
							<div>
								{letter.type === type ? null : (
									<div>
                                        <WingBlank size="lg">
										<WhiteSpace size="lg" />
										<Card
											onClick={() =>
												this.handleClick()
											}
										>
											<Card.Header
												title={letter.subject}
                                                extra={conversation.content.length - 1 + " replied"}
											/>
											<Card.Body>
												<WhiteSpace size="lg" />
												<div>
													{letter.content.substring(
														0,
														letter.content.length >
															100
															? 99
															: letter.content
																	.length - 1
													) + "..."}
												</div>
												<WhiteSpace size="lg" />
											</Card.Body>
											<Card.Footer
												content={
													<div>{letter.time}</div>
												}
												extra={<div>{letter.name}</div>}
											/>
										</Card>
                                        </WingBlank>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default withRouter(ConversationCard);
