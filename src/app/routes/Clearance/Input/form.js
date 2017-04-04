import statesArray from './states';

const formData = {
	"questionSetId": "Clearance",
	"name": "Clearance",

    "questions": [
	  {
	    "questionId": "1",    
	    "text": "Who is the First Named Insured?",
	    "name": "primaryInsuredName",
	    "inputType": "text",
	    "inputFormat": "text",
	    "tooltiptext": "This entity must be named as the Owner in the contract receiving hold harmless, indemnification and additional insured status from the hired General Contractor",
	    "required": true
	   },
	    
	  
	  {
	    "questionId": "2",
	    "name": "primaryAddressLabel",
	    "text": "What is the address of the Project?",
	    "inputFormat": "label",
	    "attributes":{
	    	"controlGroup":"projectAddress"
	    }
	    
	  },

	  {
	    "questionId": "2a",
	    "name": "projectAddress",
	    "inputFormat": 	"text",
	    "inputType": 		"text",
	    "tooltiptext": "Please provide as descriptive of a street address as possible.",           
	    "required": true,
	    "placeholder": "Address",
	    "attributes":{
	    	"controlGroup":"projectAddress"	
	    }
	  },

	  {
	    "questionId": "2b",
	    "name": "projectCity",
	    "inputFormat": 	"text",
	    "inputType": 		"text",
	    "tooltiptext": "Please provide as descriptive of a street address as possible.",           
	    "required": true,
	    "placeholder": "City",
	    "attributes":{
	    	"controlGroup":"projectAddress"	
	    }
	  },

	  {
	    "questionId": "2c",
	    "name": "projectState",
	    "inputType": "dropdown-single",
	    "tooltiptext": "Please provide as descriptive of a street address as possible.",
	    "required": true,
	    "placeholder": "State",
	    "attributes":{	
	    	"options": statesArray,
	    	"controlGroup":"projectAddress"
	    }
	    
	  },

	  {
	    "questionId": "2d",
	    "name": "projectZipcode",
	    "inputType": 		"text",
	    "inputFormat": 	"text",
	    "tooltiptext": "Please provide as descriptive of a street address as possible.",
	    "required": true,
	    "placeholder": "Zip Code",
	    "attributes":{
	    	"controlGroup":"projectAddress"
	    }
	  }
	],

	"supplementalQuestions": []
}

export default formData;