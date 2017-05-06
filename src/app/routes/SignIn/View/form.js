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
      "attributes": {
        "validationFunc":"usernameValFunc"
      }
	   },
    {
	    "questionId": "2",
	    "name": "password",
	    "inputType": "text",
	    "inputFormat": "text",
      "placeholder": "Passwords",
      "attributes": {
        "validationFunc":"passwordValFunc"
      }
	   },

	],

	"supplementalQuestions": []
}

export default formData;