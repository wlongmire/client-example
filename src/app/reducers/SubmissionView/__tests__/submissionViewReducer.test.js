/* eslint-env node, jest */

import submissionViewReducer from '../reducer'
import { 
  FETCH_SUBMISSIONS, 
  EDIT_SUBMISSION 
} from 'app/constants/user'

describe('Submission View reducer', () => {
  it('FETCH SUBMISSIONS with updated payload', () => {
    expect(
      submissionViewReducer({ foo: 'bar' }, { type: FETCH_SUBMISSIONS, payload: 'testData' }),
    ).toEqual({ foo: 'bar', data: 'testData' })
  })

  it('EDIT SUBMISSION with updated payload', () => {
    expect(
      submissionViewReducer({ foo: 'bar' }, { type: EDIT_SUBMISSION, payload: 'testSelectedSubmission' }),
    ).toEqual({ foo: 'bar', selectedSubmission: 'testSelectedSubmission' })
  })
})
