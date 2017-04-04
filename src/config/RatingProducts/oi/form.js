import statesArray from './states';

const updatedData =  {
	"questionSetId": "OIFORM",
    "name": "OIFORM",

    "questions": [
	  {
	    "questionId": "1",    
	    "text": "Who is the First Named Insured?",
	    "name": "primaryInsuredName",
			"required": true,
	    "inputType": "text",
	    "inputFormat": "text",
	    "tooltiptext": "This entity must be named as the Owner in the contract receiving hold harmless, indemnification and additional insured status from the hired General Contractor"
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

	    "text": "Is project limited to specific floors?",

	    "name": "specificFloors",
	    "inputType": 	"radio",

	    "tooltiptext": "Please choose if project is limited to specific floors.",

	    "required": true,

	    "attributes": {
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
	          "supplementalquestionIds": ["3_supplemental1"]
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
	    "questionId": "4", 

	    "text": "Is there a secondary named insured?",

	    "name": "secondaryInsured",
	    "inputType": 	"radio",

	    "tooltiptext": "Qualified entities must be named as the Owner in the contract receiving hold harmless, indemnification and additional insured status from the hired General Contractor",

	    "required": true,

	    "attributes": {
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
	          "supplementalquestionIds": [
	          	"4_supplemental1", 
	          	"4_supplemental2", 
	          	"4_supplemental3", 
	          	"4_supplemental4", 
	          	"4_supplemental5", 
	          	"4_supplemental6", 
	          	"4_supplemental7"
	          ]
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
	    "questionId": "5", 

	    "text": "Are there any additional insured?",

	    "name": "additionalInsured",
	    "inputType": 	"radio",

	    "tooltiptext": "Qualified Additional Insureds must also be named as an Additional Insured on the General Contractor’s General Liability in order to be approved",

	    "required": true,

	    "attributes": {
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
	          "supplementalquestionIds": [
	          	"5_supplemental1", 
	          	"5_supplemental2", 
	          	"5_supplemental3", 
	          	"5_supplemental4"
	          ]
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
	    "questionId": "6",
	    "name": "projectAddressLabel",
	    "text": "What is the address of the project?",
	    "inputFormat": "label",
	    "attributes":{
	    	"controlGroup":"projectAddress"
	    }   
	  },
	  {
	    "questionId": "6a",
	    "name": "projectAddress",
	    "inputFormat": "text",
	    "inputType": "text",
	    "tooltiptext": "Please provide as descriptive of a street address as possible.",           
	    "required": true,
	    "placeholder": "Address",
	    "attributes":{
	    	"controlGroup":"projectAddress"	
	    }
	  },
	  {
	    "questionId": "6b",
	    "name": "projectCity",
	    "inputFormat": "text",
	    "inputType": "text",
	    "tooltiptext": "Please provide as descriptive of a street address as possible.",           
	    "required": true,
	    "placeholder": "City",
	    "attributes":{
	    	"controlGroup":"projectAddress"	
	    }
	  },
		{
	    "questionId": "6c", 
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
	    "questionId": "6d",
	    "name": "projectZipcode",
	    "inputType": "text",
	    "inputFormat": "text",
	    "required": true,
	    "placeholder": "Zip Code",
	    "attributes":{
	    	"controlGroup":"projectAddress"
	    }
	  },
		{
	    "questionId": "7",
	    "text": "What is the term of the project, in months?",
	    "name": "projectTerm",

			"inputType": "number",       
	    "inputFormat": "number",
	    "required": true
		},
		{
	    "questionId": "8",
	    "text": "What is the total construction value of this project?",
	    "name": "totalCost",
			"inputType": "text",       
	    "inputFormat": "currency",
	    "required": true
		},
		{
	    "questionId": "9",
	    "text": "Will there be use of a tower crane on this project?",
	    "name": "towerCraneUse",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": true,
	    "attributes": {
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
			"questionId": "10", 
			"text": "Is the General Contractor known?",
			"name": "generalContractorKnown",
			"inputType": 	"radio",
			"tooltiptext": "Please choose if project is limited to specific floors.",
			"required": true,
			"attributes": {
				"options": [
					{
						"optionId": "1",
						"text": "Yes",
						"value": true,
						"supplementalquestionIds": [
							"10_supplemental1", 
							"10_supplemental2",
							"10_supplemental3",
							"10_supplemental4"
						]
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
	    "questionId": "11",
	    "text": "Will there be occupancy during the project?",
	    "name": "occupancy",
	    "inputType": "radio",
	    "required": false,
	    "attributes": {
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
						"supplementalquestionIds": [
							"11_supplemental1"
						]
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
	    "text": "Will there be demo of exterior walls or roof?",
	    "name": "exteriorDemo",
	    "inputType": "radio",
	    "required": false,
	    "attributes": {
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
						"supplementalquestionIds": [
							"12_supplemental1",
							"12_supplemental2",
							"12_supplemental3",
							"12_supplemental4"
						]
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
	    "questionId": "13",
	    "text": "Has Work started on this project?",
	    "name": "workStarted",
	    "inputType": "radio",
	    "required": false,
	    "attributes": {
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
						"supplementalquestionIds": [
							"13_supplemental1",
							"13_supplemental2",
							"13_supplemental3",
							"13_supplemental4"
						]
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
	    "questionId": "14",
	    "text": "Does this project require excess coverage?",
	    "name": "excessLimit",
	    "inputType": "radio",
	    "required": true,
	    "attributes": {
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
						"supplementalquestionIds": [
							"14_supplemental1"
						]
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
	    "name": "generalComments",
	    "text": "General Comments",
			"inputFormat": "text",
	    "inputType": "freeform",
	    "required": false
	  },
		{
	    "questionId": "16",
	    "name": "sidewalkMaintaining",
			"text": "Who is responsible for maintating the sidewalks?",
	    "inputType": "dropdown-single",
	    "required": false,
	    "attributes": {
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Select",
	          "value": "",
						"supplementalquestionIds": []
	        },
	        {
	          "optionId": "2",
	          "text": "GC",
	          "value": "GC",
						"supplementalquestionIds": []
	        },
					{
	          "optionId": "3",
	          "text": "Owner",
	          "value": "Owner",
						"supplementalquestionIds": []
	        },
					{
	          "optionId": "4",
	          "text": "Other",
	          "value": "Other",
						"supplementalquestionIds": [
							"16_supplemental1"
						]
	        }
	      ]
	    }
		},
		{
	    "questionId": "17",
	    "text": "Is this for a servicing/maintenance contract with several locations?",
	    "name": "servicingSeveralLocations",
	    "inputType": "radio",
	    "required": true,
	    "attributes": {
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
						"supplementalquestionIds": [
							"17_supplemental1"
						]
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
	    "questionId": "20",
	    "name": "nameInsuredAddressLabel",
	    "text": "Please provide your contact info to receive your indication:",
	    "inputFormat": "label",

	    "attributes":{
	    	"controlGroup":"contactInfo"	
	    }
	  },
	  {
	    "questionId": "20a",
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
	    "questionId": "20b",
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
	    "questionId": "3_supplemental1", 
	    "text": "Please provide details",
	    "name": "specificFloorsDetails",
      "inputFormat": "text",
	    "inputType": 	"freeform",
	    "tooltiptext": "Please choose if project is limited to specific floors.",
	    "required": false

	  },
	  {
	    "questionId": "4_supplemental1",
	    "name": "secondaryNameInsuredName",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Name",
	    "attributes" : {
				"controlGroup": "secondaryNamedInfo"
			}
	  },

	  {
	    "questionId": "4_supplemental2",
	    "name": "secondaryNameInsuredRelationship",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Relationship To Primary",
	    "attributes" : {
				"controlGroup": "secondaryNamedInfo"
			}
	  },
	  {
	    "questionId": "4_supplemental3",
	    "name": "secondaryNameInsuredAddress",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Address",
	    "attributes" : {
				"controlGroup": "secondaryNamedInfo"
			}
	  },
	  {
	    "questionId": "4_supplemental4",
	    "name": "secondaryNameInsuredCity",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "City",
	    "attributes" : {
				"controlGroup": "secondaryNamedInfo"
			}
	  },

	  {
	    "questionId": "4_supplemental5",
	    "name": "secondaryNameInsuredState",
	    "inputType": "dropdown-single",         
	    "required": false,
	    "attributes": {         
	      "options": statesArray,
				"controlGroup": "secondaryNamedInfo"
	    },
	    "placeholder": "State"
	  },

	  {
	    "questionId": "4_supplemental6",
	    "name": "secondaryNameInsuredZipcode",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Zipcode",
	    "attributes" : {
				"controlGroup": "secondaryNamedInfo"
			}
	  },

	  {
	    "questionId": "4_supplemental7",
	    "text": "Any other named insured?",
	    "name": "secondaryNameInsuredOther",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
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
	      ],
				"controlGroup": "secondaryNamedInfo"
	    }
	  },
    {
	    "questionId": "5_supplemental1",
	    "name": "additionalInsuredName",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Name",
	    "attributes" : {
				"controlGroup": "additionalInsuredInfo"
			}
	  },

	  {
	    "questionId": "5_supplemental2",
	    "name": "additionalInsuredRelationship",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Relationship To Primary",
	    "attributes" : {
				"controlGroup": "additionalInsuredInfo"
			}
	  },
	  {
	    "questionId": "5_supplemental3",
	    "name": "additionalInsuredRole",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Role on the Project",
	    "attributes" : {
				"controlGroup": "additionalInsuredInfo"
			}
	  },
	  {
	    "questionId": "5_supplemental4",
	    "text": "Any other additional insured?",
	    "name": "additionalInsuredOther",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
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
	      ],
				"controlGroup": "additionalInsuredInfo"
	    }
	  },
		{
	    "questionId": "10_supplemental1",
	    "name": "generalContractorName",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Name of General Contractor",
	    "attributes" : {
				"controlGroup": "generalContractorInfo"
			}
	  },

	  {
	    "questionId": "10_supplemental2",
	    "name": "generalLiabilityCarrier",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "General Liability Carrier",
	    "attributes" : {
				"controlGroup": "generalContractorInfo"
			}
	  },
	  {
	    "questionId": "10_supplemental3",
	    "name": "generalContractorAmount",
	    "inputFormat": "currency",
	    "inputType": "text",         
	    "required": false,
	    "attributes" : {
				"controlGroup": "generalContractorInfo"
			}
	  },
	  {
	    "questionId": "10_supplemental4",
	    "text": "Is the owner paying, contracting, or supervising any subcontractors other than the GC?",
	    "name": "otherSubcontractorsPaid",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
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
	      ],
				"controlGroup": "generalContractorInfo"
	    }
	  },
		{
	    "questionId": "11_supplemental1",
	    "text": "Is coverage for occupancy desired?",
	    "name": "occupancyCoverageDesired",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
						"supplementalquestionIds": [
							"11_supplementalA",
							"11_supplementalB",
							"11_supplementalC",
							"11_supplementalD",
							"11_supplementalE",
							"11_supplementalF",
							"11_supplementalG",
							"11_supplementalH",
							"11_supplementalI"
							]
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
	    "questionId": "11_supplementalA",
	    "text": "What type of occupancy?",
	    "name": "occupancyType",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Residential",
	          "value": "residential",
						"supplementalquestionIds": ["11_supplementalX"]
	        },
	        {
	          "optionId": "2",
	          "text": "Commercial",
	          "value": "commercial"
	        }
	      ],
				"controlGroup":"occupancyInfo"
	    }
	  },
		{
			"questionId": "11_supplementalX",
			"text": "How many units?",
			"name": "occupancyUnits",
			"inputType": "number",       
			"inputFormat": "number",
			"required": false,
			"attributes": {
				"controlGroup":"occupancyInfo"
			}
		},
		{
			"questionId": "11_supplementalB",
			"text": "What is the total square footage or number of occupied units?",
			"name": "occupancySquareFootage",
			"inputType": "number",       
			"inputFormat": "number",
			"required": false,
			"attributes": {
				"controlGroup":"occupancyInfo"
			}
		},
		{
	    "questionId": "11_supplementalC",
	    "text": "Any losses in the last 5 years?",
	    "name": "occupancylossIn5Years",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
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
	      ],
				"controlGroup":"occupancyInfo"
	    }
	  },
		{
	    "questionId": "11_supplementalD",
	    "text": "Will tenants and workers use different stairwells?",
	    "name": "occupancyStairwells",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
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
	      ],
				"controlGroup":"occupancyInfo"
	    }
	  },
		{
	    "questionId": "11_supplementalE",
	    "text": "Will there be separate entry?",
	    "name": "occupancySeparateEntry",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
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
	      ],
				"controlGroup":"occupancyInfo"
	    }
	  },
		{
	    "questionId": "11_supplementalF",
	    "text": "Security Personnel?",
	    "name": "occupancySecurityPersonnel",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
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
	      ],
				"controlGroup":"occupancyInfo"
	    }
	  },
		{
	    "questionId": "11_supplementalG",
	    "text": "Is there a doorman?",
	    "name": "occupancyDoorman",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
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
	      ],
				"controlGroup":"occupancyInfo"
	    }
	  },
		{
	    "questionId": "11_supplementalH",
	    "text": "Are security cameras installed?",
	    "name": "occupancyCameras",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
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
	      ],
				"controlGroup":"occupancyInfo"
	    }
	  },
		{
	    "questionId": "11_supplementalI",
	    "text": "Is building access limited via keys or card access?",
	    "name": "occupancyAccess",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
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
	      ],
				"controlGroup":"occupancyInfo"
	    }
	  },
		{
	    "questionId": "12_supplemental1",
	    "text": "Is the GC hiring a demo subcontractor?",
	    "name": "exteriorDemoSubcontractor",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
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
	      ],
				"controlGroup":"demoDetails"
	    }
	  },
		{
	    "questionId": "12_supplemental2",
	    "text": "What are the total demo costs?",
	    "name": "exteriorDemoCost",
			"inputType": "text",       
	    "inputFormat": "currency",
	    "required": false,
			"attributes": {
				"controlGroup":"demoDetails"
			}
		},
		{
	    "questionId": "12_supplemental3",
	    "text": "How long, in months, will demo take?",
	    "name": "exteriorDemoTerm",
			"inputType": "number",       
	    "inputFormat": "number",
	    "required": false,
			"attributes": {
				"controlGroup":"demoDetails"
			}
		},
		{
	    "questionId": "12_supplemental4",
	    "text": "What safety precautions, if any, are in place to protect pedestrians?",
	    "name": "exteriorDemoPrecautions",
			"inputType": "text",       
	    "inputFormat": "text",
	    "required": false,
			"attributes": {
				"controlGroup":"demoDetails"
			}
		},
		{
	    "questionId": "13_supplemental1",
	    "text": "When did work begin?",
	    "name": "workStartDate",
			"inputType": "text",       
	    "inputFormat": "date",
	    "required": false,
			"attributes": {
				"controlGroup":"termDetails"
			}
		},
		{
	    "questionId": "13_supplemental2",
	    "text": "What has been completed?",
	    "name": "workStartDescription",
			"inputType": "text",       
	    "inputFormat": "freeform",
	    "required": false,
			"attributes": {
				"controlGroup":"termDetails"
			}
		},
		{
	    "questionId": "13_supplemental3",
	    "text": "Total const spent to date?",
	    "name": "totalSpent",
			"inputType": "number",       
	    "inputFormat": "number",
	    "required": false,
			"attributes": {
				"controlGroup":"termDetails"
			}
		},
		{
	    "questionId": "13_supplemental4",
	    "text": "What is the name of the GC responsible for prior work?",
	    "name": "priorGcResponsible",
			"inputType": "text",       
	    "inputFormat": "text",
	    "required": false,
			"attributes": {
				"controlGroup":"termDetails"
			}
		},
		
	  
	  
		{
	    "questionId": "14_supplemental1",
	    "text": "What excess limits are required?",
	    "name": "excessLimitAmount",
	    "inputType": "dropdown-single",
	    "required": false,
	    "attributes": {
	      "options": [
					{
	          "optionId": "1",
	          "text": "Select Limit Amount",
	          "value": "",
						"supplementalquestionIds": []
	        },
	        {
	          "optionId": "2",
	          "text": 5000000,
	          "value": 5000000,
						"supplementalquestionIds": []
	        },
	        {
	          "optionId": "3",
	          "text": 10000000,
	          "value": 10000000,
						"supplementalquestionIds": []
	        }
	      ]
	    }
	  },
		{
	    "questionId": "16_supplemental1",
	    "text": "Please provide more details.",
	    "name": "sidewalkDetails",
			"inputType": "text",       
	    "inputFormat": "freeform",
	    "required": false
		},
		{
	    "questionId": "17_supplemental1",
	    "text": "Is the same General Contractor responsible for all sites?",
	    "name": "contractorSameAllSites",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
						"supplementalquestionIds": [
							"17_supplementalA",
							"17_supplementalB",
							"17_supplementalC",
							"17_supplementalD",
							"17_supplementalE",
							"17_supplementalF"
							]
	        },
	        {
	          "optionId": "2",
	          "text": "No",
	          "value": false
	        }
	      ]
	    }
	  },
		// Additional Site # 1
		{
	    "questionId": "17_supplementalA",
	    "name": "otherSiteLabel1",
	    "text": "Additional Site 1:",
	    "inputFormat": "label",
	    "attributes":{
	    	"controlGroup":"otherSiteDetails1"
	    }   
	  },
		{
	    "questionId": "17_supplementalB",
	    "name": "otherSiteAddress1",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Address",
	    "attributes" : {
				"controlGroup": "otherSiteDetails1"
			}
	  },
	  {
	    "questionId": "17_supplementalC",
	    "name": "otherSiteCity1",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "City",
	    "attributes" : {
				"controlGroup": "otherSiteDetails1"
			}
	  },
	  {
	    "questionId": "17_supplementalD",
	    "name": "otherSiteState1",
	    "inputType": "dropdown-single",
	    "required": false,
	    "attributes": {
	      "options": statesArray,
				"controlGroup": "otherSiteDetails1"
	    }
	  },
	  {
	    "questionId": "17_supplementalE",
	    "name": "otherSiteZipcode1",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Zipcode",
	    "attributes" : {
				"controlGroup": "otherSiteDetails1"
			}
	  },
		{
	    "questionId": "17_supplementalF",
	    "text": "Are there any additional Sites?",
	    "name": "otherSitesAdditional1",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
				"controlGroup": "otherSiteDetails1",
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
						"supplementalquestionIds": [
							"18_supplementalA",
							"18_supplementalB",
							"18_supplementalC",
							"18_supplementalD",
							"18_supplementalE",
							"18_supplementalF",

							]
	        },
	        {
	          "optionId": "2",
	          "text": "No",
	          "value": false
	        }
	      ]
	    }
	  },
		// Additional Site #2
		{
	    "questionId": "18_supplementalA",
	    "name": "otherSiteLabel2",
	    "text": "Additional Site 2:",
	    "inputFormat": "label",
	    "attributes":{
	    	"controlGroup":"otherSiteDetails2"
	    }   
	  },
		{
	    "questionId": "18_supplementalB",
	    "name": "otherSiteAddress2",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Address",
	    "attributes" : {
				"controlGroup": "otherSiteDetails2"
			}
	  },
	  {
	    "questionId": "18_supplementalC",
	    "name": "otherSiteCity2",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "City",
	    "attributes" : {
				"controlGroup": "otherSiteDetails2"
			}
	  },
	  {
	    "questionId": "18_supplementalD",
	    "name": "otherSiteState2",
	    "inputType": "dropdown-single",
	    "required": false,
	    "attributes": {
	      "options": statesArray,
				"controlGroup": "otherSiteDetails2"
	    }
	  },
	  {
	    "questionId": "18_supplementalE",
	    "name": "otherSiteZipcode2",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Zipcode",
	    "attributes" : {
				"controlGroup": "otherSiteDetails2"
			}
	  },
		{
	    "questionId": "18_supplementalF",
	    "text": "Are there any additional Sites?",
	    "name": "otherSitesAdditional2",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
				"controlGroup": "otherSiteDetails2",
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
						"supplementalquestionIds": [
							"19_supplementalA",
							"19_supplementalB",
							"19_supplementalC",
							"19_supplementalD",
							"19_supplementalE",
							"19_supplementalF",
							]
	        },
	        {
	          "optionId": "2",
	          "text": "No",
	          "value": false
	        }
	      ]
	    }
	  },
		// Additional Site #3
		{
	    "questionId": "19_supplementalA",
	    "name": "otherSiteLabel3",
	    "text": "Additional Site 3:",
	    "inputFormat": "label",
	    "attributes":{
	    	"controlGroup":"otherSiteDetails3"
	    }   
	  },
		{
	    "questionId": "19_supplementalB",
	    "name": "otherSiteAddress3",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Address",
	    "attributes" : {
				"controlGroup": "otherSiteDetails3"
			}
	  },
	  {
	    "questionId": "19_supplementalC",
	    "name": "otherSiteCity3",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "City",
	    "attributes" : {
				"controlGroup": "otherSiteDetails3"
			}
	  },
	  {
	    "questionId": "19_supplementalD",
	    "name": "otherSiteState3",
	    "inputType": "dropdown-single",
	    "required": false,
	    "attributes": {
	      "options": statesArray,
				"controlGroup": "otherSiteDetails3"
	    }
	  },
	  {
	    "questionId": "19_supplementalE",
	    "name": "otherSiteZipcode3",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Zipcode",
	    "attributes" : {
				"controlGroup": "otherSiteDetails3"
			}
	  },
		{
	    "questionId": "19_supplementalF",
	    "text": "Are there any additional Sites?",
	    "name": "otherSitesAdditional3",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
				"controlGroup": "otherSiteDetails3",
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
						"supplementalquestionIds": [
							"20_supplementalA",
							"20_supplementalB",
							"20_supplementalC",
							"20_supplementalD",
							"20_supplementalE",
							"20_supplementalF",
							]
	        },
	        {
	          "optionId": "2",
	          "text": "No",
	          "value": false
	        }
	      ]
	    }
	  },

		// Additional Site #4
		{
	    "questionId": "20_supplementalA",
	    "name": "otherSiteLabel4",
	    "text": "Additional Site 4:",
	    "inputFormat": "label",
	    "attributes":{
	    	"controlGroup":"otherSiteDetails4"
	    }   
	  },
		{
	    "questionId": "20_supplementalB",
	    "name": "otherSiteAddress4",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Address",
	    "attributes" : {
				"controlGroup": "otherSiteDetails4"
			}
	  },
	  {
	    "questionId": "20_supplementalC",
	    "name": "otherSiteCity4",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "City",
	    "attributes" : {
				"controlGroup": "otherSiteDetails4"
			}
	  },
	  {
	    "questionId": "20_supplementalD",
	    "name": "otherSiteState4",
	    "inputType": "dropdown-single",
	    "required": false,
	    "attributes": {
	      "options": statesArray,
				"controlGroup": "otherSiteDetails4"
	    }
	  },
	  {
	    "questionId": "20_supplementalE",
	    "name": "otherSiteZipcode4",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Zipcode",
	    "attributes" : {
				"controlGroup": "otherSiteDetails4"
			}
	  },
		{
	    "questionId": "20_supplementalF",
	    "text": "Are there any additional Sites?",
	    "name": "otherSitesAdditional4",
	    "inputFormat": "radio",
	    "inputType": "radio",         
	    "required": false,
	    "attributes": {
				"controlGroup": "otherSiteDetails4",
	      "options": [
	        {
	          "optionId": "1",
	          "text": "Yes",
	          "value": true,
						"supplementalquestionIds": [
							"21_supplementalA",
							"21_supplementalB",
							"21_supplementalC",
							"21_supplementalD",
							"21_supplementalE",
							"21_supplementalF",
							]
	        },
	        {
	          "optionId": "2",
	          "text": "No",
	          "value": false
	        }
	      ]
	    }
	  },
		// Additional Site #5
		{
	    "questionId": "21_supplementalA",
	    "name": "otherSiteLabel5",
	    "text": "Additional Site 5:",
	    "inputFormat": "label",
	    "attributes":{
	    	"controlGroup":"otherSiteDetails5"
	    }   
	  },
		{
	    "questionId": "21_supplementalB",
	    "name": "otherSiteAddress5",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Address",
	    "attributes" : {
				"controlGroup": "otherSiteDetails5"
			}
	  },
	  {
	    "questionId": "21_supplementalC",
	    "name": "otherSiteCity5",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "City",
	    "attributes" : {
				"controlGroup": "otherSiteDetails5"
			}
	  },
	  {
	    "questionId": "21_supplementalD",
	    "name": "otherSiteState5",
	    "inputType": "dropdown-single",
	    "required": false,
	    "attributes": {
	      "options": statesArray,
				"controlGroup": "otherSiteDetails5"
	    }
	  },
	  {
	    "questionId": "21_supplementalE",
	    "name": "otherSiteZipcode5",
	    "inputFormat": "text",
	    "inputType": "text",         
	    "required": false,
	    "placeholder": "Zipcode",
	    "attributes" : {
				"controlGroup": "otherSiteDetails5"
			}
	  }

	]
}

export default updatedData;
