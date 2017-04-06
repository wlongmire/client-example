import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import DialogBox from 'components/shared/DialogBox'
import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import FormBuilder from 'components/shared/FormBuilder';
import form from './form.js';

class Input extends Component {
    constructor(props) {
      super(props);
      this.state = {
        requiredFields: [],
        validationModal: false
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.okValidationModal = this.okValidationModal.bind(this);
    }

    handleSubmit(values, controlGroups, requiredFields) {

      if(requiredFields.length > 0){

        this.setState({
          ...this.state,
          requiredFields,
          validationModal: true
        })
      } else {

        this.props.handleSubmit(values);
      }
    }

    okValidationModal(){
      this.setState({
        ...this.state,
        validationModal: false
      })
    }

    render() {
      const requiredList = ()=> {
        return this.state.requiredFields.map((r, idx)=>{
          if (r.questionId == '2c'){
            r.text = 'State';
          }
          return (
            <div>
              <span className="question"><u>{(r.text ? r.text : r.placeholder)}</u></span><br/>
            </div>
            );
        })
    }

      return (
        <div>
            <h3>First Let's Check for Clearance.</h3>
            <h4>Enter the following information to clear against previous submissions.</h4>

            <FormBuilder
                data={form}
                submitTitle="Check For Clearance"
                handleSubmit={this.handleSubmit}
            />


          <DialogBox
            custom_class="confirmationDialog"
            title="Please fill out all of the required fields."
            subtitle="The remaining outstanding questions are:"
            show={this.state.validationModal}
            >
            <div>
              {requiredList()}
              <br/>

              <ButtonGroup>
                <Button className="btn secondary" onClick={this.okValidationModal}>Ok</Button>
              </ButtonGroup>
            </div>

        </DialogBox>

        </div>);
    }
}

export default connect()(Input);
