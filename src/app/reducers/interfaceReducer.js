const initialState = {
		oi:{
			showConfirmationDialog:false,
			editing:false
		},
		values:{}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case "SET_CONFIRMATION_DIALOG_OI":
			return Object.assign(state,{
				oi:{showConfirmationDialog:action.value}
			});

		case "SAVE_VALUES":
			return Object.assign(state,{
				values:action.values
			});
	}

	return state;
}
