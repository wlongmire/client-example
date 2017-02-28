const initialState = {
		oi:{
			showConfirmationDialog:false
		},
		ocp:{
			showConfirmationDialog:false
		},
		values:{}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case "SET_CONFIRMATION_DIALOG_OI":
			return Object.assign(state,{
				oi:{showConfirmationDialog:action.value}
			});

		case "SET_CONFIRMATION_DIALOG_OCP":
			return Object.assign(state,{
				ocp:{showConfirmationDialog:action.value}
			});
		case "SAVE_VALUES":
			return Object.assign(state,{
				values:action.values
			});
	}

	return state;
}
