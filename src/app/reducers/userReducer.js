import * as constants from '../constants';

const userReducer = (state = {}, {type, payload}) => {
    if (payload && payload.state && payload.state.type === constants.USER_LOGGED_IN) {
        return payload;
    }
    if (payload && payload.state && payload.state.type === constants.USER_LOGGED_OUT) {
        return {}
    }

    return state;
};
export default userReducer;