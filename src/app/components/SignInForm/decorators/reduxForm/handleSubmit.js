import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import config from '../../../../../config';

let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');



export default function handleSubmit(values, dispatch) {
  return () => {
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

        if (!res.success) {
          console.log("NOT success");
          return Promise.reject(res.message);
        }

        const { premium } = res;

        return dispatch(push({
          pathname: '/form',
          state: {
            premium
          }
        }));
      })
      .catch((error) => {
        console.log("Got ERROR", error);
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
