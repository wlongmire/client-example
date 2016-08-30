import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import config from '../../../../../config';

let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');

let handleSubmit =  (values, dispatch) => {

  return (dispatch, store) => {
    let scopeStore = store;

    return fetch(baseURL + '/um/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: formatRequestBody(values)
    })
    .then(res => res.json())
    .then((res) => {
      
      if (!res.status == 200) {
        return Promise.reject(res.message);
      }
      const {user, token} = res;
      // console.log("Dispatching (push)");
      // console.log(user);

      localStorage.setItem('token', token);

      /**
       * @TODO Properly set up react redux authentication
       * See https://github.com/mjrussell/react-redux-jwt-auth-example/tree/react-router-redux
       */
      return dispatch(push({
        pathname: '/form',

        state: {
          type: 'USER_LOGGED_IN',
          payload: res,
          user: user
        }
      }));
    })
    .catch((error) => {
      return Promise.reject({ _error: error });
    });
  };
}

function formatRequestBody(values) {
  return JSON.stringify({
    ...values,
    username: values.credentials.username,
    password: values.credentials.password
  });
}

export default handleSubmit;