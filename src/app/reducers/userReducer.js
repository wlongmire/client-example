const USER_LOGGED_IN = 'USER_LOGGED_IN';
const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

const userReducer = (state = {}, {type, payload}) => {
    console.log("type: %s", type);
    console.log(state);
    
    if (type === USER_LOGGED_IN) {
        return payload;
    }
    if (type === USER_LOGGED_OUT) {
        return {}
    }

    return state;
};
export default userReducer;