/*
 *  Note, these requests are from the Airflows project
 *  here as an example and starting point.
 */

if (!window.fetch) {
  // safari polyfill
  require('whatwg-fetch');
}

import config from 'config';

export const UPDATE_USER = 'UPDATE_USER';

export function updateUser (user) {
  return {
    type: UPDATE_USER,
    user
  };
}

export function postUser (user) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      fetch(config.server.url + '/platform/user', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }

        return response.json();
      })
      .then((fetchRes) => {
        dispatch(updateUser(fetchRes));
        resolve(fetchRes);
      });
    });
  };
}

export function putUser (user) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      fetch(config.server.url + '/platform/user', {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }

        return response.json();
      })
      .then((fetchRes) => {
        dispatch(updateUser(fetchRes));
      });
    });
  };
}
