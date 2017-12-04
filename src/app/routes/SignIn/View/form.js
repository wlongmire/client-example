const formData = {
  questionSetId: 'SignIn',
  name: 'SignIn',

  questions: [{
    questionId: '1',
    text: '',
    name: 'username',
    inputType: 'text',
    inputFormat: 'text',
    placeholder: 'Email Address',
    required: 'true',
    attributes: {
      validationFunc: 'usernameValFunc'
    }
  },
  {
    questionId: '2',
    name: 'password',
    inputType: 'text',
    inputFormat: 'password',
    placeholder: 'Password',
    required: 'true',
    attributes: {
      validationFunc: 'passwordValFunc'
    }
  }],

  supplementalQuestions: []
}

export default formData