export default function mapStateToProps() {
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
