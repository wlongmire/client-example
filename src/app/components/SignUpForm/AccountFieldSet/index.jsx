import React, { Component, PropTypes } from 'react';

import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import config from '../../../../config';
import { validationStatus, validationMessage } from 'app/utils/reduxForm';

import PureInput from 'components/shared/PureInput';
import PurePassword from 'components/shared/PurePassword';
import PureOptionSelect from 'components/shared/PureOptionSelect';

//let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');
let baseURL = config.apiserver.url;

let defaultBroker = {_id: '', name: 'Select a Broker'};

class AccountFieldSet extends Component {
  constructor(props) {
    super(props);
    props.field.broker.value = defaultBroker._id;
    this.state = {
      account: {
        title: props.title ? props.title : 'Here for the first time?',
        firstName: props.field.firstName,
        lastName: props.field.lastName,
        broker: props.field.broker,
        brokers: []
      }
    };
  }

  componentDidMount() {
    return fetch(baseURL + '/um/listBrokers', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => {

      if (!res.success) {
        return Promise.reject(res.message);
      }

      console.log(res.brokers);

      // Cause a UI render
      this.setState({
        account: {
          firstName: this.props.field.firstName,
          lastName: this.props.field.lastName,
          broker: this.props.field.broker,
          brokers: res.brokers
        }
      });

      return Promise.resolve(true);
    }).catch((e) => {
      console.log("ERROR!", e);
      return Promise.reject({ _error: e.message });
    });
  }

  render () {
    const {
      title,
      field: {
        firstName,
        lastName,
        broker
      },
      errors
    } = this.props;

    let state = this.state;

    return (
      <div>
        <PureInput
          type="text"
          field={firstName}
          placeholder="Enter First Name"
          validation_status={ validationStatus(errors, "firstName") }
          validation_message={ validationMessage(errors, "firstName") }
        />

        <PureInput
          type="text"
          field={lastName}
          placeholder="Enter Last Name"
          validation_status={ validationStatus(errors, "lastName") }
          validation_message={ validationMessage(errors, "lastName") }
        />

        <PureOptionSelect
          field={broker}
          validation_status={ validationStatus(errors, "broker") }
          validation_message={ validationMessage(errors, "broker") }
          >

          <option value="">Please Select a Broker</option>
          {
            state.account.brokers.length > 0 ? state.account.brokers.map((brkr) => (
              <option key={brkr.name} value={brkr._id}>{brkr.name}</option>
            )) : ''
          }
        </PureOptionSelect>
      </div>
    );
  }
}

export default AccountFieldSet;
