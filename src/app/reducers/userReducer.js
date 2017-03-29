import * as constants from '../constants/user';

const userReducer = (state = {}, {type, payload}) => {
  if (payload && payload.state && payload.state.type === constants.USER_LOGGED_IN) {
    return payload.state.user;
  }
  if (type === constants.USER_LOGGED_OUT) { 
    return null;
  }
  return state;
};
export default userReducer;
