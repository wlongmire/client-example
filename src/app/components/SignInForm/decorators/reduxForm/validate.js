export default function validate(values) {
    const errors = {
        credentials: {}
    };

    if (!values.credentials.username) {
        errors.credentials.username = 'User name is required.';
    } else if (values.credentials.username.length < 3) {
        errors.credentials.username = 'Invalid user name. Must be three (3) characters or longer.';
    }

    if (!values.credentials.password) {
        errors.credentials.password = 'Password is required.';
    } else if (values.credentials.password.length < 8) {
        // @TODO enforce password complexity on server side, etc
        errors.credentials.password = 'Invalid password. Must be eight (8) characters or longer.';
    }

    return errors;
};