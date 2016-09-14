import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import config from '../../../../config';

import PureInput from 'components/shared/PureInput';
import PurePassword from 'components/shared/PurePassword';
import PureOptionSelect from 'components/shared/PureOptionSelect';

let baseURL = config.apiserver.url + (config.apiserver.port ? ':' + config.apiserver.port : '');
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
    
    let state =this.state;
    let props = this.props.field;

    return (
      <fieldset>
        {state.account.title}
        <ul>
          <li>
            <label>
              First Name*
              <PureInput
                type="text"
                field={props.firstName}
              />
            </label>
          </li>
          <li>
            <label>
              Last Name
              <PureInput
                type="text"
                field={props.lastName}
              />
            </label>
          </li>
          <li>
            <label>
              Broker
              <PureOptionSelect field={props.broker}>
                <option value="">Please Select a Broker</option>
                {
                  
                  state.account.brokers.length > 0 ? state.account.brokers.map((brkr) => (
                    <option key={brkr.name} value={brkr._id}>{brkr.name}</option>
                  )) : ''
                }
              </PureOptionSelect>
            </label>
          </li>
        </ul>
      </fieldset>
    );
  }
}

export default connect()(AccountFieldSet);
