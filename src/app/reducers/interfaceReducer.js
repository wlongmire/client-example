const initialState = {
		oi:{
			showConfirmationDialog:false
		},
		ocp:{
			showConfirmationDialog:false
		}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case "SET_CONFIRMATION_DIALOG_OI":
			return {
				oi:{showConfirmationDialog:action.value}
			};

		case "SET_CONFIRMATION_DIALOG_OCP":
			return {
				ocp:{showConfirmationDialog:action.value}
			};
	}

	return state;
}
