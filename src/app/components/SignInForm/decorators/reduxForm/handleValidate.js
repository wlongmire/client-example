export default function handleValidate(values) {
    const errors = {};

    if (!values.username) {
        errors.username = 'User name is required.';
    } else if (values.username.length < 3) {
        errors.username = 'Invalid user name. Must be three (3) characters or longer.';
    }

    if (!values.password) {
        errors.password = 'Password is required.';
    } else if (values.password.length < 8) {
        // @TODO enforce password complexity on server side, etc
        errors.password = 'Invalid password. Must be eight (8) characters or longer.';
    }

    return errors;
};