import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import config from '../../../../../config';
import validate from './validate';

import base_form_structure from 'content/formStructure';

import _ from 'lodash';

//let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');
const baseURL = config.apiserver.url;

const handleSubmit = (values, dispatch) => {
  const errors = validate(values);

  const async_errors =
  _.every(
    Object.keys(errors),
    (field)=>(!_.isEmpty(errors[field]))
  );

  if (async_errors) {
    return dispatch({
      type: 'SET_FORM_ERROR',
      payload: {
        signin:errors
      }
    });
  }

  return () => {
    fetch(baseURL + '/um/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: formatRequestBody(values)
    })
    .then(res => res.json())
    .then((res) => {
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
      localStorage.setItem('viewer', JSON.stringify(user));

      dispatch({
        type: 'SET_FORM_ERROR',
        payload:{
          base_form_structure
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
