import React, { Component, PropTypes } from 'react'

import { LinkContainer } from 'react-router-bootstrap'

import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import FormBuilder from 'components/shared/FormBuilder';

const clearanceForm = {
    "questionSetId": "Clearance",
	"name": "Clearance",

    "questions": [
		{
			"questionId": "1",
			"text": "What is the Primary Insured's Name?",
			"name": "insuredName",
			"inputType": "text",
			"inputFormat": "text",
			"tooltiptext": "This entity must be named as the Owner in the contract receiving hold harmless, indemnification and additional insured status from the hired General Contractor",
			"required": true,
            "placeholder": "Name"
		},

        {
			"questionId": "2a",
			"text": "What is the Primary Insured's Address?",
			"inputType": "label",
            "attributes": {
                "controlGroup": "insuredAddress"
            }
		},
        {
			"questionId": "2b",
			"name": "insuredAddress",
			"inputType": "text",
            "inputFormat": "text",
            "placeholder": "Address",
            "attributes": {
                "controlGroup": "insuredAddress"
            }
		},
        {
			"questionId": "2c",
			"name": "insuredCity",
			"inputType": "text",
            "inputFormat": "text",
            "placeholder": "City",
            "attributes": {
                "controlGroup": "insuredAddress"
            }
		},
        {
			"questionId": "2d",
			"name": "insuredState",
			"inputType": "dropdown-single",
            "attributes": {
                "options": [{
					"optionId": "1",
					"text": "AK",
					"value": "AK"
				}, {
					"optionId": "2",
					"text": "AL",
					"value": "AL"
				}],
                "controlGroup": "insuredAddress"
            }
		},
        {
			"questionId": "2e",
			"name": "insuredZipcode",
			"inputType": "text",
            "inputFormat": "text",
            "placehoder": "Zipcode",
            "attributes": {
                "controlGroup": "insuredAddress"
            }
		}
	],

	"supplementalQuestions": [
	]
}


class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        const input = {
            name:"Warren Longmire",
            address:"2923 N 27th Street Philadelphia, PA 19132"
        }

        this.props.handleSubmit(input)
    }

    render() {
        return (
            <form>
                <h3>First Let's Check for Clearance</h3>
                <h4>Enter the following information to clear against previous submissions</h4>

                <FormBuilder
                    data={clearanceForm}
                    submitTitle="Check For Clearance"
                    handleSubmit={
                        (values)=>{
                            console.log(values)
                        }
                    }
                />

            </form>
            );
    }
}

export default connect()(Input)