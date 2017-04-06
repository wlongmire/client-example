import React from 'react';
import ReactDOM from 'react-dom';

import {Button} from 'react-bootstrap';
import FormItemContainer from './FormItemContainer';

import getSupplementalQuestions from './utils/getSupplementalQuestions';
import getControlGroups from './utils/getControlGroups';
import getFormData from './utils/getFormData';
import flatten from './utils/flattenObject';

import DefaultValidation from './utils/DefaultValidation';

class FormBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: []
    };

    this.state = this.props.data;
    
    this.controlGroups = getControlGroups(this.state.questions);
    this.initialValues = flatten(this.props.initialValues || {});

    this.onSubmit = this.onSubmit.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }

  onSubmit(event) {
    console.log('xx getting to submit');
    console.log('xx form data', this.state);
    event.preventDefault();
    let values = getFormData(this.state);
    let flatValues = flatten(values);
    // console.log("FLAT VALUES", flatValues);
    let allRequiredArray = [];
    for (const item of this.state.questions) {
      // console.log('ITEM', item);
      // for(const value of values) {
      console.log('--> ITEM', item);
      console.log('--> item.name', item.name);
      console.log('--> values', flatValues[item.name]);

      if( item.required == true && !flatValues[item.name]) {
        allRequiredArray.push(item);
      }
      // }
    }
    console.log('required array', allRequiredArray);

    let remainingRequiredArray = [];
    console.log('yy values', values);
    // for(const item of values ){
    //   if (value == )
    // }

    this.props.handleSubmit(values, this.controlGroups, allRequiredArray);
  }

  onFormChange(event) {
    const values = flatten(getFormData(this.state));
    const form = this.state.questions;
  }

  render() {
    console.log('23 getting here');
    let { controlGroups } = this;
    let Validation = this.props.Validation || DefaultValidation;
    
    let result = [];
    
    for (let group in controlGroups) {
      let formItemContainers = controlGroups[group].map((item, index) => {

        let closureState = this.state;
        let validationClosure = function() {
          return getFormData(closureState);
        };
        
        return (
          <FormItemContainer key={index} data={item}
            supplementalQuestions={this.state.supplementalQuestions}
            handleFormChange={this.onFormChange}
            validation={new Validation(validationClosure)}
            initialValues= {this.initialValues}/>
        );
      });
      
      result.push(
        <div key={group} className='group'>
          {formItemContainers}
        </div>
      );
    
    }

    // show button only if the form elements are created
    let button = (result.length > 0) ? (
      <Button type="submit">
          { this.props.submitTitle || "Submit" }
        </Button>
    ) : null;

    return (
      <form className={`formBuilderElement ${this.state.name}`} onSubmit={this.onSubmit}>
        <div className="form">
          
          {result}
          
          {button}
        </div>
        
      </form>
    );
  }
}

export default FormBuilder;