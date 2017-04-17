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
    this.initialParams = (this.props.initialParams || {});

    this.onSubmit = this.onSubmit.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }

  onSubmit(event) {

    event.preventDefault();
    let values = getFormData(this.state);
    let flatValues = flatten(values);
    let allRequiredArray = [];
    for (const item of this.state.questions) {

      if( item.required == true && !flatValues[item.name]) {
        allRequiredArray.push(item);
      }
    }

    this.props.handleSubmit(values, this.controlGroups, allRequiredArray);
  }

  onFormChange(event) {
    const values = flatten(getFormData(this.state));
    const form = this.state.questions;
  }

  render() {
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
            initialParams= {this.initialParams}
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