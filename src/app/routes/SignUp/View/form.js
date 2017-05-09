const formData = {
	"questionSetId": "SignIn",
	"name": "SignIn",

  "questions": [
	  {
	    "questionId": "1",    
	    "text": "",
	    "name": "username",
	    "inputType": "text",
	    "inputFormat": "text",
      "placeholder": "Username",
			"required":"true"
	  },
    {
	    "questionId": "2",
	    "name": "password",
	    "inputType": "text",
	    "inputFormat": "password",
      "placeholder": "Password",
			"required":"true"
	   },
		 {
	    "questionId": "3",
	    "name": "retypePassword",
	    "inputType": "text",
	    "inputFormat": "password",
      "placeholder": "Confirm Password",
			"required":"true"
	   },
		 {
	    "questionId": "4",    
	    "text": "",
	    "name": "firstName",
	    "inputType": "text",
	    "inputFormat": "text",
      "placeholder": "First Name",
			"required":"true"
	  },
		{
	    "questionId": "5",    
	    "text": "",
	    "name": "lastName",
	    "inputType": "text",
	    "inputFormat": "text",
      "placeholder": "Last Name",
			"required":"true"
	  },
		{
	    "questionId": "6",
	    "text": "",
	    "name": "broker",
	    "inputType": "dropdown-single",
	    "inputFormat": "text",
      "placeholder": "Last Name",
			"required":"true",
			"attributes":{
				"optionsFunc": "brokers"
	    }
	  }
	],

	"supplementalQuestions": []
}

export default formData;