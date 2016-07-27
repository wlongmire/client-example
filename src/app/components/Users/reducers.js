import {
  UPDATE_USER
} from './actions';

function user (state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return Object.assign({}, state, action.user);

    default:
      return state;
  }
}

export default user;
