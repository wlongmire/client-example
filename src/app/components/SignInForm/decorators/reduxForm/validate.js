export default function validate(values) {
	const errors = {
		credentials:{}
	};

	if (!values.credentials.username) {
		errors.credentials.username = 'Username is required';
	} else if (values.credentials.username.length < 3) {
		errors.credentials.username = 'Invalid user name. Must be three (3) characters or longer.';
	}

	if (!values.credentials.password) {
		errors.credentials.password = 'Password is required';
	}

	return errors;
};
