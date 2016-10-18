import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import config from '../../../config';
import { FETCH_SUBMISSIONS, USER_LOGGED_OUT } from '../../constants';

let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');


export function getSubmissions(brokerId) {

 return (dispatch) => {

    fetch(baseURL + '/api/getSubmissions', {
      method: 'GET',
      headers: {
        //'Accept': 'application/json',
        //'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then((res) => {
      if(res.type && res.type === 'TokenExpired'){
        return dispatch(push({
          pathname: '/',
          state: {
            type: 'USER_LOGGED_OUT',
            payload: {},
            user: {}
          }
        }));
      }
      dispatch({
        type: FETCH_SUBMISSIONS,
        payload: res.submissions
      });

    })
    .catch((error) => {

      return Promise.reject({
        _error: error.message
      });
    });
 };
}

