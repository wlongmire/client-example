/* eslint-env node, jest */

import submissionReducer from '../submissionReducer'
import appReducer from '../appReducer'
import userReducer from '../userReducer'
import { 
  FETCH_SUBMISSIONS,
  EDIT_SUBMISSION,
  SUBMISSION_STATUS,
  CHANGE_SUBMISSION_STATUS,
  CHANGE_SUBMISSION,
  CLEAR_SUBMISSION
} from 'app/constants/submission'

import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from '../../constants/user'

describe('Submission View reducer', () => {
  it('FETCH SUBMISSIONS with updated payload', () => {
    expect(
      submissionReducer({ foo: 'bar' }, { type: FETCH_SUBMISSIONS, payload: 'testData' })
    ).toEqual({ foo: 'bar', data: 'testData' })
  })
})

describe('App reducer', () => {
  it('CHANGE SUBMISSION STATUS with updated payload', () => {
    expect(
      appReducer({ foo: 'bar' }, { type: CHANGE_SUBMISSION_STATUS, status: 'test123' })
    ).toEqual({ foo: 'bar', status: 'test123' })
  })

  it('CLEAR SUBMISSION with updated payload', () => {
    expect(
      appReducer({ submission: 'bar' }, { type: CLEAR_SUBMISSION, submissionFormParams: 'test123' })
    ).toEqual({ submission: {}, submissionFormParams: {} })
  })

  it('EDIT SUBMISSION with updated payload', () => {
    expect(
      appReducer({}, { type: EDIT_SUBMISSION, payload: 'test123' })
    ).toEqual({ submission: 'test123' })
  })
})


describe('User reducer', () => {
  it('LOGGED IN with updated payload', () => {
    expect(
      userReducer({}, { type: USER_LOGGED_IN, payload: { user: 'test123' } })
    ).toEqual({ user: 'test123' })
  })

  it('LOGGED OUT with updated payload', () => {
    expect(
      userReducer({ submission: 'bar' }, { type: USER_LOGGED_OUT, user: 'test123' })
    ).toEqual(null)
  })
})