import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

export default function handleSubmit(values, dispatch) {
  return () => {
    return fetch('/um/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: formatRequestBody(values)
    })
      .then(res => res.json())
      .then((res) => {
        if (!res.success) return Promise.reject(res.message);
        const { premium } = res;
        return dispatch(push({
          pathname: '/',
          state: {
            premium
          }
        }));
      })
      .catch((error) => {
        return Promise.reject({ _error: error.message });
      });
  };
}

function formatRequestBody(values) {
  let result = JSON.stringify({
    ...values,
    username: values.credentials.username,
    password: values.credentials.password,
    retypePassword: values.credentials.retypePassword
  });

  return result;
}
