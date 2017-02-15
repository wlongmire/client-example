import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import config from '../../../../config';

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
      <fieldset>
        <h3>Account Details</h3>

        <ul className="no-bullets">
          <li>

            <PureInput
              label="First Name"
              type="text"
              field={firstName}
              placeholder="Enter First Name"
              validation_status={
                (()=> ((errors.firstName)?"error":"default"))()
              }
              validation_message={
                (errors.firstName || '')
              }
            />

          </li>

          <li>

            <PureInput
              label="Last Name"
              type="text"
              field={lastName}
              placeholder="Enter Last Name"
              validation_status={
                (()=> ((errors.lastname)?"error":"default"))()
              }
              validation_message={
                (errors.lastname || '')
              }
            />

          </li>

          <li>

            <PureOptionSelect
              label="Broker"
              field={broker}
              validation_status={ (errors.broker)?"error":"default" }
              validation_message={ (errors.broker || '') }>

              <option value="">Please Select a Broker</option>
              {
                state.account.brokers.length > 0 ? state.account.brokers.map((brkr) => (
                  <option key={brkr.name} value={brkr._id}>{brkr.name}</option>
                )) : ''
              }
            </PureOptionSelect>

          </li>

        </ul>
      </fieldset>
    );
  }
}

export default connect((state) => {

  return ({
    errors: state.error.signup.account
  });

})(AccountFieldSet);
