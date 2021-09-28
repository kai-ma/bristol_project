import * as actionTypes from "../../constants/report";
import Http from "@src/utils/http.js";
import { Toast } from "antd-mobile";

export const report = (body, reportedIds) => {
	return (dispatch) => {
		if (reportedIds.indexOf(body.letterId) > -1) {
			Toast.fail("Please wait for the processing result", 2);
		} else {
			dispatch({
				type: actionTypes.SEND_REPORT_REQUEST,
			});

			Http({
				url: "/report/send",
				body: body,
				mock: false,
			}).then(
				(res) => {
					dispatch(reportSuccess(body, reportedIds));
					Toast.success("Report successfully", 2);
				},
				(err) => {
					//已经举报过
					if (err.errCode === 20006) {
						reportedIds.push(body.letterId);
					}
					dispatch(reportFailure(err));
					Toast.fail(err.errMsg, 2);
				}
			);
		}
	};
};

const reportSuccess = (body, reportedIds) => {
	//向数组中添加已经report过的letterId
	// reportedIds.add(body.letterId);
	reportedIds.push(body.letterId);

	return {
		type: actionTypes.SEND_REPORT_SUCCESS,
		payload: reportedIds,
	};
};

const reportFailure = (error) => {
	return {
		type: actionTypes.SEND_REPORT_FAILURE,
		payload: error,
	};
};
