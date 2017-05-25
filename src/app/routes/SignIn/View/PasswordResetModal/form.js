const formData = {
  questionSetId: 'PasswordReset',
  name: 'PasswordReset',

  questions: [{
    questionId: '1',
    name: 'newPassword',
    inputType: 'text',
    inputFormat: 'password',
    placeholder: 'Enter New Password'
  },
  {
    questionId: '2',
    name: 'rePassword',
    inputType: 'text',
    inputFormat: 'password',
    placeholder: 'Reenter Password'
  }],
  supplementalQuestions: []
}

export default formData