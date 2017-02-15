import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import config from '../../../../../config';
import validate from './validate';

import _ from 'lodash';

//let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');
const baseURL = config.apiserver.url;

const handleSubmit = (values, dispatch) => {
  return () => {
    const errors = validate(values);

    if (!_.isEmpty(errors.credentials)) {
      return dispatch({
        type: 'SET_FORM_ERROR',
        payload: {
          signin:errors
        }
      });
    }

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

      let payload = {};

      switch(res.message) {
        case("Your account has not been verified. Please contact your administrator."):
          return dispatch({
            type: 'SET_FORM_ERROR',
            payload:{
              signin:{
                  credentials:{
                    'username':'Username Not Found'
                  }
              }
            }
          });

        case("Password or username are incorrect"):
          return dispatch({
            type: 'SET_FORM_ERROR',
            payload:{
              signin:{
                  credentials:{
                    'password':'Password/Username are not correct'
                  }
              }
            }
          });
      }

      const {user, token} = res;
      let newPath = user.role === 'poweruser' ? '/powerconsole' : '/home';

      localStorage.setItem('token', token);

      dispatch({
        type: 'SET_FORM_ERROR',
        payload:{
          'signin':{
            credentials:{}
          }
        }
      });

      return dispatch(push({
        pathname: newPath,

        state: {
          type: 'USER_LOGGED_IN',
          payload: res,
          user: user
        }
      }));
    })
    .catch((e) => {
      return Promise.reject({ _error: e });
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
