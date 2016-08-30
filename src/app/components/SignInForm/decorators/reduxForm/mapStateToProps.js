export default function mapStateToProps(state) {
    // console.log("state");
    // console.log(state);
  return {
    initialValues: {
      user: null,
      credentials: {
        username: null,
        password: null,
        type: null
      }
    }
  };
}
