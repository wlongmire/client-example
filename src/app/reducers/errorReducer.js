const forms_structure = {
	signin:{
		credentials:{}
	},

	signup:{
		credentials:{},
		account:{}
	}
}

export default function (state = forms_structure, action) {

	switch (action.type) {
		case "SET_FORM_ERROR":
			return action.payload;
			default:
	}

	return state;
}
