import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import config from '../../../config';
import { FETCH_SUBMISSIONS, USER_LOGGED_OUT, EDIT_SUBMISSION } from '../../constants';

//let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');

let baseURL = config.apiserver.url;


export function getSubmissions(brokerId) {

  return (dispatch) => {

    fetch(baseURL + '/api/getSubmissions', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then((res) => {
      if(res.type && res.type === 'TokenExpired'){
        dispatch({
          type: USER_LOGGED_OUT,
          payload: {},
          user: {}
        });

        dispatch(push('/'));
      }
      dispatch({
        type: FETCH_SUBMISSIONS,
        payload: res
      });
   
   // empty previous edited submission in the store
      dispatch({
        type: EDIT_SUBMISSION,
        payload: {}
      });

    })
    .catch((error) => {

      return Promise.reject({
        _error: error.message
      });
    });
  };
}


export function editSubmission(submission) {
  return (dispatch) => {

    dispatch({
      type: EDIT_SUBMISSION,
      payload: submission
    });
  
    if(submission.type === 'ocp'){
      dispatch(push('/contractorsform'));
    }else{
      dispatch(push('/form'));
    }

  };
}

export function resetForm() {
  return (dispatch) => {

    dispatch({
      type: EDIT_SUBMISSION,
      payload: {}
    });

    dispatch(push('/form'));

  };
}

export function resetContractorsForm() {
  return (dispatch) => {

    dispatch({
      type: EDIT_SUBMISSION,
      payload: {}
    });

    dispatch(push('/contractorsform'));

  };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('viewer');
  return (dispatch) => {

    dispatch({
      type: USER_LOGGED_OUT
    });

    dispatch(push('/'));

  };
}

