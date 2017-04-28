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
	    "text": "What is the First Named Insured's Address?",
	    "inputFormat": "label",
	    "attributes":{
	    	"controlGroup":"insuredAddress"
	    }
	    
	  },

	  {
	    "questionId": "2a",
	    "name": "primaryInsuredAddress",
	    "inputFormat": 	"text",
	    "inputType": 		"text",
	    "tooltiptext": "Please provide as descriptive of a street address as possible.",           
	    "required": true,
	    "placeholder": "Address",
	    "attributes":{
	    	"controlGroup":"insuredAddress"	
	    }
	  },

	  {
	    "questionId": "2b",
	    "name": "primaryInsuredCity",
	    "inputFormat": 	"text",
	    "inputType": 		"text",
	    "tooltiptext": "Please provide as descriptive of a street address as possible.",           
	    "required": true,
	    "placeholder": "City",
	    "attributes":{
	    	"controlGroup":"insuredAddress"	
	    }
	  },

	  {
	    "questionId": "2c",
	    "name": "primaryInsuredState",
	    "inputType": "dropdown-single",
	    "tooltiptext": "Please provide as descriptive of a street address as possible.",
	    "required": true,
	    "placeholder": "State",
	    "attributes":{	
	    	"options": statesArray,
	    	"controlGroup":"insuredAddress"
	    }
	    
	  },

	  {
	    "questionId": "2d",
	    "name": "primaryInsuredZipcode",
	    "inputType": 		"text",
	    "inputFormat": 	"text",
	    "tooltiptext": "Please provide as descriptive of a street address as possible.",
	    "required": true,
	    "placeholder": "Zip Code",
	    "attributes":{
	    	"controlGroup":"insuredAddress"
	    }
	  },

	  {
	    "questionId": "3",
	    "name": "primaryAddressLabel",
	    "text": "What is the Project Address?",
	    "inputFormat": "label",
	    "attributes":{
	    	"controlGroup":"projectAddress"
	    }
	    
	  },

	  {
	    "questionId": "3a",
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
	    "questionId": "3b",
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
	    "questionId": "3c",
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
	    "questionId": "3d",
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