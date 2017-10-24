const formData = {
  questionSetId: 'PasswordReset',
  name: 'PasswordReset',

  questions: [{
    questionId: '1',
    name: 'newPassword',
    text: 'Password',
    inputType: 'text',
    inputFormat: 'password'
  },
  {
    questionId: '2',
    name: 'rePassword',
    inputType: 'text',
    inputFormat: 'password',
    text: 'Confirm Password',
  }],
  supplementalQuestions: []
}

export default formData