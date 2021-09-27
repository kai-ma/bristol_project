import React, { Component } from "react";
import {
	List,
	TextareaItem,
	NavBar,
	Button,
	Toast,
	WhiteSpace,
	Modal,
	Tag,
	WingBlank,
} from "antd-mobile";
import { createForm } from "rc-form";
import { connect } from "react-redux";
import Loading from "@src/components/Loading";
import { report } from "@src/redux/actions/report";
import "./index.css";

const alert = Modal.alert;

class Report extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentDidMount() {}

	initialState = {
		reporting: false,
		tags: [
			"Harassing",
			"Lewd content",
			"Fraud",
			"Prompting activities",
			"Other",
		],
		choosenTags: new Set(),
	};

	handleSubmit = () => {
		alert("Confirm Report", "Are you confirm to report this letter?", [
			{
				text: "Confirm",
				onPress: () => {
					if (this.state.choosenTags.size == 0) {
						Toast.fail("Please select at least one tag", 1.5);
					} else {
						let body = {};
						this.props.form.validateFields((error, value) => {
							if (error) {
								Toast.fail(
									this.props.form.getFieldError(
										Object.keys(error)[0]
									)
								);
							} else {
								body.reason = this.readReasonFromChoosenTags();
								body.letterId = this.props.reportLetter.id;
								if (
									value != null &&
									value.description != null &&
									value.description.length != 0
								) {
									body.description = value.description;
								}

								alert("Confirm report!", "", [
									{
										text: "Confirm",
										onPress: () => this.handleReport(body),
									},
									{
										text: "Cancel",
									},
								]);
							}
						});
					}
				},
			},
			{ text: "Cancel", onPress: () => console.log("cancel") },
		]);
	};

	readReasonFromChoosenTags = () => {
		let reason = "";
		for (let tag of this.state.choosenTags) {
			reason = reason + "," + tag;
		}
		reason = reason.substring(1);
		return reason;
	};

	handleReport = (body) => {
		this.props.report(body, this.props.reportedIds);
	};

	navToBack = () => {
		this.props.history.goBack();
	};

	selectTag = (selected, tag) => {
		let choosenTags = this.state.choosenTags;
		if (selected) {
			choosenTags.add(tag);
			this.setState({
				choosenTags: choosenTags,
			});
		} else {
			choosenTags.delete(tag);
			this.setState({
				choosenTags: choosenTags,
			});
		}
	};

	render() {
		const letter = this.props.reportLetter;
		const { getFieldProps } = this.props.form;
		const Item = List.Item;
		const { tags } = this.state;
		const reported =
			this.props.reportedIds != null &&
			this.props.reportedIds.indexOf(letter.id) > -1;

		return (
			<div>
				<NavBar
					leftContent="Back"
					mode="light"
					onLeftClick={this.navToBack}
				>
					Report
				</NavBar>

				{letter == null ? (
					<div>{this.showMessage("Please try again")}</div>
				) : (
					<div>
						<List className="short content">
							<Item wrap disabled>
								<div>
									{letter.content.substring(
										0,
										letter.content.length > 200
											? 199
											: letter.content.length - 1
									) + "..."}
								</div>
							</Item>
						</List>
					</div>
				)}

				<WhiteSpace size="lg" />

				{this.props.reporting ? (
					<div>
						<Loading message={"Report..."}></Loading>
					</div>
				) : (
					<div>
						{reported ? (
							<div>
								<List
									renderHeader={() =>
										"Report processing status"
									}
								></List>

								<WingBlank size="lg">
									<List className="short content">
										<Item wrap disabled>
											<div>
												The report is being processed.
											</div>
											<div>Please wait patiently.</div>
										</Item>
									</List>
									<WhiteSpace size="lg" />
								</WingBlank>
							</div>
						) : (
							<div>
								<List
									renderHeader={() =>
										"Help us understand what's happening..."
									}
								></List>

								<div className="tag-container">
									{tags.map((tag, index) => (
										<Tag
											key={index}
											onChange={(selected) => {
												this.selectTag(selected, tag);
											}}
										>
											{tag}
										</Tag>
									))}
								</div>
								<List renderHeader={() => "Description"}>
									<TextareaItem
										{...getFieldProps("description", {
											initialValue: "",
										})}
										rows={4}
										count={200}
										placeholder="Optional messages for better handling of reports."
									/>
								</List>
								<WhiteSpace size="xl" />
								<Button
									type="primary"
									onClick={this.handleSubmit}
								>
									Submit
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		reportLetter: state.letter.reportLetter,
		reportedIds: state.report.reportedIds,
		reporting: state.report.reporting,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		report: (body, reportedIds) => dispatch(report(body, reportedIds)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(createForm()(Report));
