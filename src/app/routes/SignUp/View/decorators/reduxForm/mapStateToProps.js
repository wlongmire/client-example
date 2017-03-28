export default function mapStateToProps(state) {

	return {
		initialValues: {

			credentials: {
				username: null,
				password: null,
				retypePassword: null
			},
			account: {
				firstName: null,
				lastName: null,
				broker: null
			}
		}
	};
}
