import constants from 'src/app/constants/app';

const initialState = {
	status:constants.SUBMISSION_STATUS.NONE,
	submission:{}
};

export default function (state = initialState, action) {
	const {
		CHANGE_SUBMISSION_STATUS,
		CHANGE_SUBMISSION,
		CLEAR_SUBMISSION
	} = constants;

	switch (action.type) {
		case CHANGE_SUBMISSION_STATUS:
			return Object.assign(state,{
				status:action.status
			});

		case CHANGE_SUBMISSION:
			const submission = Object.assign(state.submission, action.submission);
			return Object.assign(state,{
				submission	
			});
			
		case CLEAR_SUBMISSION:
			return Object.assign(state,{
				submission:{}
			});
	}

	return state;
}
