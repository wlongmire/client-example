const oiQuestions = [
  {
    questionId: '1',    
    text: 'Who is the First Named Insured?',
    //label text
    name: 'nameInsuredName',
    inputFormat: 'text',
    //text mask of the data, including numeric, percentage, monetary, date, password
    inputType: 'text',
    //type of input, including text, freeform(textarea), dropdown single(checkbox), dropdown multi(option)
    tooltipText: 'This entity must be named as the Owner in the contract receiving hold harmless, indemnification and additional insured status from the hired General Contractor',
    //tooltip display          
    required: true,
    //is a required field
    validationRules: {         
      api: 'check if the the same name was quoted in the last 90 days'
    },
  },
  {
    questionId: '2a',
    // all ids 2a / 2b / 2c / 2d are the part of the same question but input fields
    // are separate
    name: 'nameInsuredAddress',
    text: 'What is the address of the Named Insured?',
    inputFormat: 'text',
    inputType: 'text',
    tooltipText: 'Please provide as descriptive of a street address as possible.',           
    required: true,
    validationRules: {         
      api: 'check if the the same name was quoted in the last 90 days'
    },
    placeholder: 'Address'
  },
  {
    questionId: '2b',
    // all ids 2a / 2b / 2c / 2d are the part of the same question but input fields
    // are separate
    name: 'nameInsuredCity',
    text: 'What is the address of the Named Insured?',
    inputFormat: 'text',
    inputType: 'text',
    tooltipText: 'Please provide as descriptive of a street address as possible.',           
    required: true,
    validationRules: {         
      api: 'check if the the same name was quoted in the last 90 days'
    },
    placeholder: 'City'
  },
  {
    questionId: '2c',
    // all ids 2a / 2b / 2c / 2d are the part of the same question but input fields
    // are separate
    name: 'namedInsuredState',
    text: 'What is the address of the Named Insured?',
    inputFormat: 'dropdown',
    inputType: 'text',
    tooltipText: 'Please provide as descriptive of a street address as possible.',           
    required: true,
    validationRules: {         
      options: ['AK','AL','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'],
      api: 'check if the the same name was quoted in the last 90 days'
    },
    placeholder: 'State'
  },
  {
    questionId: '2d',
    // all ids 2a / 2b / 2c / 2d are the part of the same question but input fields
    // are separate  
    text: 'What is the address of the Named Insured?',
    name: 'nameInsuredZipcode',
    inputFormat: 'text',
    inputType: 'text',
    tooltipText: 'Please provide as descriptive of a street address as possible.',           
    required: true,
    validationRules: {         
      length:1,
      //there must be a least 1 character in the inpt
      api: 'check if the the same name was quoted in the last 90 days'
    },
    placeholder: 'Zip Code'
  },
  {
    questionId: '3', 
    text: 'Is project limited to specific floors?',
    name: 'specificFloors',
    inputFormat: 'radio',
    inputType: 'boolean',           
    required: true,
    validationRules: {         
      api: 'check if the the same name was quoted in the last 90 days'
    },
    placeholder: 'Address'
  },
  {
    questionId: '4', 
    text: 'Is project limited to specific floors?',
    name: 'specificFloors',
    inputFormat: 'radio',
    inputType: 'boolean',
    tooltipText: 'Please choose if project is limited to specific floors.',           
    required: true,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: ['5']
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '5', 
    text: 'Give Details',
    name: 'specificFloorsDetails',
    inputFormat: 'freeform',
    inputType: 'text',           
    required: false,
  },
  {
    questionId: '6', 
    text: 'Is there a secondary named insured?',
    name: 'secondaryNamedInsured',
    inputFormat: 'radio',
    inputType: 'boolean',
    tooltipText: 'Qualified entities must be named as the Owner in the contract receiving hold harmless, indemnification and additional insured status from the hired General Contractor', 
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: ['7a', '7b', '7c', '7d', '7e', '7f', '7g']
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '7a',
    name: 'secondaryNameInsuredName',
    inputFormat: 'text',
    inputType: 'text',         
    required: false,
    placeholder: 'Name'
  },
  {
    questionId: '7b',
    name: 'secondaryNameInsuredRelationship',
    inputFormat: 'text',
    inputType: 'text',         
    required: false,
    placeholder: 'Relationship To Primary'
  },
  {
    questionId: '7c',
    name: 'secondaryNameInsuredAddress',
    inputFormat: 'text',
    inputType: 'text',         
    required: false,
    placeholder: 'Address'
  },
  {
    questionId: '7d',
    name: 'secondaryNameInsuredCity',
    inputFormat: 'text',
    inputType: 'text',         
    required: false,
    placeholder: 'City'
  },
  {
    questionId: '7e',
    name: 'secondaryNameInsuredState',
    inputFormat: 'dropdown',
    inputType: 'text',         
    required: false,
    validationRules: {         
      options: ['AK','AL','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
    },
    placeholder: 'State'
  },
  {
    questionId: '7e',
    name: 'secondaryNameInsuredZipcode',
    inputFormat: 'text',
    inputType: 'text',         
    required: false,
    placeholder: 'Zipcode'
  },
  {
    questionId: '7g',
    text: 'Any other named insured?',
    name: 'secondaryNameInsuredOther',
    inputFormat: 'radio',
    inputType: 'text',         
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: []
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '8',
    text: 'Is there any additional insured?',
    name: 'additionalInsured',
    inputFormat: 'radio',
    inputType: 'boolean',         
    required: false,
    tooltipText: 'Qualified Additional Insureds must also be named as an Additional Insured on the General Contractor’s General Liability in order to be approved',
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: ['9a', '9b', '9c', '9d']
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '9a',
    name: 'additionalInsuredName',
    inputFormat: 'text',
    inputType: 'text',         
    required: false,
    placeholder: 'Name'
  },
  {
    questionId: '9b',
    name: 'additionalInsuredRelationship',
    inputFormat: 'text',
    inputType: 'text',         
    required: false,
    placeholder: 'Relationship To Primary'
  },
  {
    questionId: '9c',
    name: 'additionalInsuredRole',
    inputFormat: 'text',
    inputType: 'text',         
    required: false,
    placeholder: 'Role on Project'
  },
  {
    questionId: '9d',
    text: 'Is there any additional insured?',
    name: 'additionalInsuredOther',
    inputFormat: 'radio',
    inputType: 'boolean',
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: []
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '10a',
    // all ids 10a / 10b / 10c / 10d are the part of the same question but input fields
    // are separate
    name: 'projectAddress',
    text: 'What is the address of this project?',
    inputFormat: 'text',
    inputType: 'text',
    tooltipText: 'Please provide as descriptive of a street address as possible.',           
    required: true,
    placeholder: 'Address'
  },
  {
    questionId: '10b',
    // all ids 10a / 10b / 10c / 10d are the part of the same question but input fields
    // are separate
    name: 'projectCity',
    text: 'What is the address of this project?',
    inputFormat: 'text',
    inputType: 'text',
    tooltipText: 'Please provide as descriptive of a street address as possible.',           
    required: true,
    placeholder: 'City'
  },
  {
    questionId: '10c',
    // all ids 10a / 10b / 10c / 10d are the part of the same question but input fields
    // are separate
    name: 'projectState',
    text: 'What is the address of this project?',
    inputFormat: 'dropdown',
    inputType: 'text',
    tooltipText: 'Please provide as descriptive of a street address as possible.',           
    required: true,
    validationRules: {         
      options: ['AK','AL','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'],
      api: 'check if the the same name was quoted in the last 90 days'
    },
    placeholder: 'State'
  },
  {
    questionId: '10d',
    // all ids 10a / 10b / 10c / 10d are the part of the same question but input fields
    // are separate  
    text: 'What is the address of this project?',
    name: 'projectZipcode',
    inputFormat: 'text',
    inputType: 'text',
    tooltipText: 'Please provide as descriptive of a street address as possible.',           
    required: true,
    placeholder: 'Zip Code'
  },
  {
    questionId: '11',
    text: 'Please describe the scope of work for this project (as much detail as possible - include end use)',
    name: 'projectScope',
    inputFormat: 'freeform',
    inputType: 'text',         
    required: false,
    tooltipText: 'Please be as descriptive as possible'
  },
  {
    questionId: '12',
    text: 'What is the term of the project, in months?',
    name: 'projectScope',
    inputFormat: 'number',
    inputType: 'number',         
    required: true,
    tooltipText: 'Please provide the anticipated project term. Note: Maximum length of term cannot exceed 60 months.'
  },
  {
    questionId: '13',
    text: 'What is the total construction value of this project? (ie. tools, equipment, materials)',
    name: 'totalConstructionValue',
    inputFormat: 'currency',
    inputType: 'number',         
    required: true,
    tooltipText: 'Total Construction Value means the total cost of all work let or sublet including: a) the cost of all labor, materials and equipment furnished, used or delivered for use in the execution of the work and b) all fees bonuses or commissions made, paid or due.'
  },
  {
    questionId: '14',
    text: 'Will there be use of a tower crane on this project?',
    name: 'towerCraneUse',
    inputFormat: 'radio',
    inputType: 'boolean',         
    required: true,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: []
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '15',
    text: 'Is the General Contractor known?',
    name: 'generalContractorKnown',
    inputFormat: 'radio',
    inputType: 'boolean',         
    required: false,
    tooltipText: 'Note: Coverage will be quoted subject to form U658 until the General Contractor is reviewed and approved. To approve the General Contractor we will need at a minimum, fully executed contract, certificate of insurance, and endorsement listing from the GC’s General Liability.',
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: ['16a', '16b', '16c', '16d']
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '16a',  
    name: 'generalContractorName',
    inputFormat: 'text',
    inputType: 'text',          
    required: false,
    placeholder: 'Name of General Contractor'
  },
  {
    questionId: '16b',  
    name: 'generalLiabilityCarrier',
    inputFormat: 'text',
    inputType: 'text',       
    required: false,
    placeholder: 'General Liability Carrier'
  },
  {
    questionId: '16c',  
    name: 'generalContractorAmount',
    inputFormat: 'currency',
    inputType: 'number',       
    required: false
  },
  {
    questionId: '16d',
    text: 'Is the owner paying, contracting, or supervising any subcontractors other than the GC?',
    name: 'generalContractorAmount',
    inputFormat: 'radio',
    inputType: 'boolean',       
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: []
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '17',
    text: 'Will there be occupancy during the project?',
    name: 'occupancy',
    inputFormat: 'radio',
    inputType: 'boolean',       
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: ['18']
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '18',
    text: 'Is coverage for occupancy desired?',
    name: 'occupancyCoverageDesired',
    inputFormat: 'radio',
    inputType: 'boolean',       
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: ['19a', '19b', '19c', '19d', '19e', '19f', '19g', '19h', '19i']
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '19a',
    text: 'What type of occupancy?',
    name: 'occupancyType',
    inputFormat: 'radio',
    inputType: 'text',       
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Residential',
          value: 'Residential',
          supplementalQuestionIds: ['20']
        },
        {
          optionId: '2',
          text: 'Commercial',
          value: 'Commercial',
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '19b',
    text: 'What is the total square footage or number of occupied units?',
    name: 'occupancySquareFootage',
    inputFormat: 'number',
    inputType: 'number',       
    required: false
  },
  {
    questionId: '19c',
    text: 'Any losses in the last 5 years?',
    name: 'occupancylossIn5Years',
    inputFormat: 'radio',
    inputType: 'boolean',       
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: []
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '19d',
    text: 'Will tenants and workers use different stairwells?',
    name: 'occupancyStairwells',
    inputFormat: 'radio',
    inputType: 'boolean',       
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: []
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '19e',
    text: 'Will there be separate entry?',
    name: 'occupancySeparateEntry',
    inputFormat: 'radio',
    inputType: 'boolean',       
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: []
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '19f',
    text: 'Security Personnel?',
    name: 'occupancySecurityPersonnel',
    inputFormat: 'radio',
    inputType: 'boolean',       
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: []
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '19g',
    text: 'Is there a doorman?',
    name: 'occupancyDoorman',
    inputFormat: 'radio',
    inputType: 'boolean',       
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: []
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '19h',
    text: 'Are security cameras installed?',
    name: 'occupancyCameras',
    inputFormat: 'radio',
    inputType: 'boolean',       
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: []
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '19i',
    text: 'Is building access limited via keys or card access?',
    name: 'occupancyAccess',
    inputFormat: 'radio',
    inputType: 'boolean',       
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: []
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '20',
    text: 'How many units?',
    name: 'occupancyTypeUnits',
    inputFormat: 'number',
    inputType: 'number',       
    required: false
  },
  {
    questionId: '21',
    text: 'Will there be demo of exterior walls or roof?',
    name: 'exteriorDemo',
    inputFormat: 'radio',
    inputType: 'boolean',       
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: ['22a', '22b', '22c',  '22d']
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '22a',
    text: 'Is the GC hiring a demo subcontractor?',
    name: 'exteriorDemoSubcontractor',
    inputFormat: 'radio',
    inputType: 'boolean',       
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'Yes',
          value: true,
          supplementalQuestionIds: []
        },
        {
          optionId: '2',
          text: 'No',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    }
  },
  {
    questionId: '22b',
    text: 'What are the total demo costs?',
    name: 'exteriorDemoCost',
    inputFormat: 'currency',
    inputType: 'text',       
    required: false,
  },
  {
    questionId: '22c',
    text: 'How long, in months, will demo take?',
    name: 'exteriorDemoTerm',
    inputFormat: 'number',
    inputType: 'number',       
    required: false,
  },
  {
    questionId: '22d',
    text: 'What safety precautions, if any, are in place to protect pedestrians?',
    name: 'exteriorDemoPrecautions',
    inputFormat: 'text',
    inputType: 'text',       
    required: false,
  },
  {
    questionId: '23',
    text: 'Does this project require excess coverage?',
    name: 'excessLimit',
    inputFormat: 'radio',
    inputType: 'text',       
    required: true,
    attributes: {
      options: [
        {
          optionId: '1',
          text: 'yes',
          value: true,
          supplementalQuestionIds: ['24']
        },
        {
          optionId: '2',
          text: 'nop',
          value: false,
          supplementalQuestionIds: []
        }
      ]
    },
    placeholder: 'Select Limit Amount'
  },
  {
    questionId: '24',
    text: 'What excess limits are required?',
    name: 'excessLimit',
    inputFormat: 'radio',
    inputType: 'text',       
    required: false,
    attributes: {
      options: [
        {
          optionId: '1',
          text: '$ 5,000,000',
          value: '5000000',
          supplementalQuestionIds: []
        },
        {
          optionId: '2',
          text: '$ 10,000,000',
          value: '10000000',
          supplementalQuestionIds: []
        }
      ]
    },
    placeholder: 'Select Limit Amount'
  },
  {
    questionId: '25',
    text: 'General Comments',
    name: 'generalComments',
    inputFormat: 'text',
    inputType: 'text',       
    required: false,
  },
  {
    questionId: '26a',
    text: 'Please provide your contact info to receive your indication:',
    name: 'email',
    inputFormat: 'email',
    inputType: 'text',       
    required: true,
    validationRules: [
      {value: 'email'}
    ],
    placeholder: 'Email'
  },
  {
    questionId: '26b',
    text: 'Please provide your contact info to receive your indication:',
    name: 'email',
    inputFormat: 'text',
    inputType: 'text',       
    required: true,
    placeholder: 'Phone'
  }
];
