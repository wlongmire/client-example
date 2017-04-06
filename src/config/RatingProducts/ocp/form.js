import ocpStatesArray from './states';
import statesArray from './../states';

const ocpData = {
	  "questionSetId": "OCPFORM",
    "name": "OCPFORM",

    "questions": [
	  {
	    "questionId": "1",    
	    "text": "Who is the Primary Named Insured?",
	    "name": "primaryInsuredName",
      "required": true,
	    "inputType": "text",
	    "inputFormat": "text",
	    "tooltiptext": "This entity must be named as the Owner in the contract receiving hold harmless indemnification and additional insured status from the hired General Contractor"
	   },
		 {
	    "questionId": "2",
	    "name": "primaryInsuredAddressLabel",
	    "text": "What is the address of the Named Insured?",
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
	    "text": "What is the term of the project, in months?",
	    "name": "projectTerm",
      "required": true,
	    "inputType": "number",
	    "inputFormat": "number",
	    "tooltiptext": "Please provide the anticipated project term. Note: Maximum length of term cannot exceed 60 months."
	   },
		 {
	    "questionId": "4",
	    "text": "What is the total cost of this project?",
	    "name": "totalCost",
      "required": true,
	    "inputType": "text",
	    "inputFormat": "currency",
	    "tooltiptext": "Total Costs means the total cost of all work let or sublet including: a) the cost of all labor, materials and equipment furnished, used or delivered for use in the execution of the work and b) all fees bonuses or commissions made, paid or due."
	   },
     {
	    "questionId": "5",
	    "text": "What is the anticipated finish date of project?",
	    "name": "anticipatedFinishDate",
      "required": true,
	    "inputType": "text",
	    "inputFormat": "date"
	   },
     {
	    "questionId": "6",    
	    "text": "What is the name of the designated contractor?",
	    "name": "generalContractor",
      "required": false,
	    "inputType": "text",
	    "inputFormat": "text"
	   },
     {
	    "questionId": "7",    
	    "text": "Who is the GL Carrier of Contrainer?",
	    "name": "generalContractorCarrier",
      "required": true,
	    "inputType": "text",
	    "inputFormat": "text"
	   },
     {
	    "questionId": "8",    
	    "text": "When is the Expiration Date of the Contactor's GL Policy?",
	    "name": "generalContractorExpirationDate",
      "required": true,
	    "inputType": "text",
	    "inputFormat": "date"
	   },

     {
	    "questionId": "9",    
	    "text": "What are the Excess limits of the Contractor's primary Policy?",
	    "name": "excessLimit",
      "required": false,
	    "inputType": "text",
	    "inputFormat": "currency"
	   },

     {
	    "questionId": "10",
	    "name": "nameInsuredAddressLabel",
	    "text": "What is the address of this project",
	    "inputFormat": "label",
	    "attributes":{
	    	"controlGroup":"projectAddress"
	    }   
	  },

	  {
	    "questionId": "10a",
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
	    "questionId": "10b",
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
	    "questionId": "10c", 
	    "name": "projectState",
	    "inputType": "dropdown-single",
	    "tooltiptext": "Please provide as descriptive of a street address as possible.",
	    "required": true,
	    "attributes": {	
	    	"options": ocpStatesArray,
	    	"controlGroup":"projectAddress"
	    }
	  },
	  {
	    "questionId": "10d",
	    "name": "projectZipcode",
	    "inputType": 		"text",
	    "inputFormat": 	"text",
	    "tooltiptext": "Please provide as descriptive of a street address as possible.",
	    "required": true,
	    "placeholder": "Zip Code",
	    "attributes": {
	    	"controlGroup":"projectAddress"
	    }
	  },
    {
	    "questionId": "11",
      "text": "Does the project include the addition of any stories or vertical expansion?",
	    "name": "verticalExpansion",
	    "inputType": "radio",
	    "required": true,
	    "attributes":{	
	    	"options": [
          {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true
	        },
	        {
	          "optionId": "2",
	          "text": "No",
	          "value": false
	        }
        ]
	    }
	    
	  },
    {
	    "questionId": "12", 
	    "name": "specificFloors",
      "text": "Is project limited to specific floors?",
	    "inputType": "radio",
	    "required": true,
	    "attributes":{	
	    	"options": [
          {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
	          "supplementalquestionIds": ["12_supplemental1"]
	        },
	        {
	          "optionId": "2",
	          "text": "No",
	          "value": false,
	          "supplementalquestionIds": []
	        }
        ]
	    }
	  },
    {
	    "questionId": "13",    
	    "text": "What is the scope of the work for this project?",
	    "name": "scope",
      "required": false,
	    "inputType": "freeform",
	    "inputFormat": "text",
	    "tooltiptext": "Please provide as descriptive of a scope of work as possible including end use."
	   },
    {
	    "questionId": "14",
	    "name": "isSupervisingSubs",
      "text": "Will the named insured be involved with any supervision or oversight of the project?",
	    "inputType": "radio",
	    "required": false,
	    "attributes":{	
	    	"options": [
          {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true
	        },
	        {
	          "optionId": "2",
	          "text": "No",
	          "value": false
	        }
        ]
	    }
	  },
    {
	    "questionId": "15",
	    "name": "projectRequirements",
      "text": "Does the project require any of the following: Blasting, Airport Runways, Bridge Construction, Parking Garages/Decks, Dam, Underground Tunneling for subways, mines?",
	    "inputType": "radio",
	    "required": true,
	    "attributes":{	
	    	"options": [
          {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true
	        },
	        {
	          "optionId": "2",
	          "text": "No",
	          "value": false
	        }
        ]
	    }
	  },
    {
	    "questionId": "16",
	    "name": "limitsRequested",
      "text": "What limits are being requested for this OCP?",
	    "inputType": "dropdown-single",
	    "required": true,
	    "attributes":{	
	    	"options": [
          {
	          "optionId": "1",
	          "text": "Select",
	          "value": ""
	        },
	        {
	          "optionId": "2",
	          "text": "1m/2m",
	          "value": "12"
	        },
          {
	          "optionId": "3",
	          "text": "2m/2m",
	          "value": "22"
	        },
          {
	          "optionId": "4",
	          "text": "2m/4m",
	          "value": "24"
	        },
          {
	          "optionId": "5",
	          "text": "3m/3m",
	          "value": "33"
	        },
          {
	          "optionId": "6",
	          "text": "4m/4m",
	          "value": "44"
	        },
          {
	          "optionId": "7",
	          "text": "5m/5m",
	          "value": "55"
	        }
        ]
	    }
	  },
    {
	    "questionId": "17",
	    "name": "otherSubcontractorsPaid",
      "text": "Is the owner paying, contracting, or supervising any subcontractors other than GC?",
	    "inputType": "radio",
	    "required": false,
	    "attributes":{	
	    	"options": [
          {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true
	        },
	        {
	          "optionId": "2",
	          "text": "No",
	          "value": false
	        }
        ]
	    }
	  },

    {
	    "questionId": "18",
	    "name": "nameInsuredAddressLabel",
	    "text": "Please provide your contact info to receive your indication:",
	    "inputFormat": "label",

	    "attributes":{
	    	"controlGroup":"contactInfo"	
	    }
	  },
	  {
	    "questionId": "18a",
	    "name": "nameInsuredEmail",
	    "inputType": "text",
	    "inputFormat": "email",
	    "required": true,
	    "placeholder": "Email",
	    "attributes":{
	    	"controlGroup":"contactInfo"
	    }
	  },
	  {
	    "questionId": "18b",
	    "name": "phone",
	    "inputType": "text",
	    "inputFormat": "text",
	    "required": true,
	    "placeholder": "Phone",
	    "attributes":{
	    	"controlGroup":"contactInfo"
	    }
	  }
	],

	"supplementalQuestions": [
    {
	    "questionId": "12_supplemental1",    
	    "text": "Please provide details.",
	    "name": "specificFloorsDetails",
      "required": false,
	    "inputType": "text",
	    "inputFormat": "freeform"
	   },
		 {
	    "questionId": "10_supplemental1",     
	    "name": "nycha",
      "text": "Is this a NYCHA Project?",
	    "inputType": "radio",
	    "required": false,
	    "attributes":{	
	    	"options": [
          {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true
	        },
	        {
	          "optionId": "2",
	          "text": "No",
	          "value": false
	        }
        ]
	   	}
		 }
	]
}

export default ocpData;
