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
      "tooltiptext": "This entity must be named as the Owner in the contract receiving hold harmless indemnification and additional insured status from the hired General Contractor"
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
      "inputFormat":   "text",
      "inputType":     "text",
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
      "inputFormat":   "text",
      "inputType":     "text",
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
      "inputType":     "text",
      "inputFormat":   "text",
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
      "inputFormat": "number"
    },
    {
      "questionId": "4",
      "text": "What is the total cost of this project?",
      "name": "totalCost",
      "required": true,
      "inputType": "text",
      "inputFormat": "currency"
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
      "text": "What is the address of this project?",
      "inputFormat": "label",
      "attributes":{
        "controlGroup":"projectAddress"
      }
    },

    {
      "questionId": "10a",
      "name": "projectAddress",
      "inputFormat":   "text",
      "inputType":     "text",
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
      "inputFormat":   "text",
      "inputType":     "text",
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
      "inputType":     "text",
      "inputFormat":   "text",
      "tooltiptext": "Please provide as descriptive of a street address as possible.",
      "required": true,
      "placeholder": "Zip Code",
      "attributes": {
        "controlGroup":"projectAddress"
      }
    },
    {
      "questionId": "13",
      "text": "What is the scope of the work for this project?",
      "name": "projectScope",
      "required": false,
      "inputType": "freeform",
      "inputFormat": "text",
      "tooltiptext": "Please provide as descriptive of a scope of work as possible including end use."
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
      "questionId": "6",
      "text": "What is the name of the designated contractor?",
      "name": "generalContractor",
      "required": false,
      "inputType": "text",
      "inputFormat": "text"
    },
    {
      "questionId": "7",
      "text": "Who is the GL Carrier of Contractor?",
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
      "name": "exteriorWorkFourStories",
      "text": "Is there any exterior work being done over 4 stories?",
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
      "questionId": "19",
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
      "name": "email",
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

export default ocpData;