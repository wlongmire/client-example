import {
  UPDATE_USER
} from './actions';

exports.example = function (state = {
  hello: 'world'
}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return Object.assign({}, state, action.user);

    default:
      return state;
  }
}
