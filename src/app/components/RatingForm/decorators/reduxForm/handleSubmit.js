import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

export default function handleSubmit(values, dispatch) {
  return () => {
    return fetch('/api/getRating', {
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
          pathname: '/quote',
          state: {
            premium,
            email: values.contactInfo.email
          }
        }));
      })
      .catch((error) => {
        return Promise.reject({ _error: error.message });
      });
  };
}

function formatRequestBody(values) {
  return JSON.stringify({
    ...values,
    state: values.address.state,
    term: values.term,
    costs: values.costs,
    contractorKnown: values.generalContractor.isKnown === 'yes',
    supervisingSubs: values.generalContractor.isSupervisingSubs === 'yes',
    demoRequired: values.demoDetails.willHave === 'yes',
    occupancy: values.occupancyDetails.willHave === 'yes',
    workStarted: values.workDetails.hasStarted === 'yes'
  });
}
