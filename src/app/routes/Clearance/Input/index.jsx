import React, { Component, PropTypes } from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';

import FormBuilder from 'components/shared/FormBuilder';

import form from './form.js';

class Input extends Component {
    constructor(props) {
      super(props);
      this.state = {};

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values, controlGroups, requiredFields) {

      // requiredFields is returning all the fields that are blank
      // TO_DO_AK: prevent this.props.handleSubmit 
      console.log(' There are required Reamining fields = ', requiredFields);

      if(requiredFields.length > 0){
        let fields = ''; // temporary
        for(const blah of requiredFields){ // temporary
          fields = fields.concat(` ${blah.name}`); // temporary
        } // temporary

        alert(`Remaining Required Fields are = , ${fields}`);
      } else {
        
        this.props.handleSubmit(values);
      }
    }

    render() {
      return (
        <div>
            <h3>First Let's Check for Clearance.</h3>
            <h4>Enter the following information to clear against previous submissions.</h4>

            <FormBuilder
                data={form}
                submitTitle="Check For Clearance"
                handleSubmit={this.handleSubmit}
            />

        </div>);
    }
}

export default connect()(Input);
