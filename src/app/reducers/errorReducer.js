import formStructure from 'content/formStructure';

export default function (state = formStructure, action) {
	switch (action.type) {
		case "SET_FORM_ERROR":
			return action.payload;
			default:
	}

	return state;
}
