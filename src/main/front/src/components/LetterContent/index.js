import React, { Component } from "react";
import { WingBlank, WhiteSpace, Card } from "antd-mobile";
//letterbox 首封信、回信部分详情都用的这个  answerbook conversation详情全部用的这个
class LetterContent extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {};

	render() {
		const { letter } = this.props;
		return (
			<div>
				<WingBlank size="lg">
					<WhiteSpace size="lg" />
					<Card>
						{letter.title != null ? (
							<Card.Header title={letter.title} />
						) : null}
						<Card.Body>
                            <WhiteSpace size="lg" />
							<div>{letter.content}</div>
                            <WhiteSpace size="lg" />
                            <WhiteSpace size="lg" />
                        </Card.Body>
                        <Card.Footer
							content={<div>{letter.createdAt}</div>}
							extra={<div>{letter.pseudonym}</div>}
						/>
					</Card>
					<WhiteSpace size="lg" />
				</WingBlank>
			</div>
		);
	}
}

export default LetterContent;
