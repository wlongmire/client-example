/* eslint-env node, jest */

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import * as actions from '../actions'
import LocalStorageMock from '../../../__mocks__/localStorageMock'
import { 
  FETCH_SUBMISSIONS, 
  USER_LOGGED_OUT, 
  EDIT_SUBMISSION 
} from 'app/constants/user'
import constants from 'app/constants/app'
import config from '../../../../config'

const baseURL = config.apiserver.url

global.localStorage = new LocalStorageMock()

describe('>>> Action - reset Form', () => {
  it('successful call should dispatch someAction', () => {
    // create mock thunk & store
    const createMockStore = configureMockStore([thunk])
    // expected results once action is dispatched
    const expectedActions = [
      { type: EDIT_SUBMISSION, payload: {} },
      { payload: { args: ['/oiform'], method: 'push' },
        type: '@@router/CALL_HISTORY_METHOD',
      },
    ]
    const initialAppState = {}

    const store = createMockStore(initialAppState)

    // Act.
    store.dispatch(actions.resetForm())

    // Assert.
    const dispatchedActions = store.getActions()
    expect(dispatchedActions).toEqual(expectedActions)
  })
})

describe('>>> Action - editSubmission', () => {
  let http = {
      editSubmission: jest.fn(() => Promise.resolve({ test: 'test345' })),
    };
  beforeEach(() => {
    // Mock the TMDB configuration request response
    nock(baseURL)
      .get('/api/getSubmission/randomId')
      .reply(200, { test: 'test1234' })
  })


  it('successful call should dispatch someAction', () => {
    const submission = {
      _id: 'randomId',
      test: 123
    }
    const { CHANGE_SUBMISSION_STATUS, SUBMISSION_STATUS } = constants

    // create mock thunk & store
    const createMockStore = configureMockStore([thunk])
    // expected results once action is dispatched
    const expectedActions = [
      { type: EDIT_SUBMISSION, payload: submission },
      { type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.EDIT },
      { type: constants.CHANGE_SUBMISSION,
        submission: { type: submission.type, status: constants.SUBMISSION_STATUS.CLEARANCE } },
      { payload: { args: ['/oiform'], method: 'push' },
        type: '@@router/CALL_HISTORY_METHOD',
      },
    ]
    const initialAppState = {}

    const store = createMockStore(initialAppState)

    // Act.
    store.dispatch(actions.editSubmission(submission))

    // Assert.
    const dispatchedActions = store.getActions()
    expect(dispatchedActions).toEqual(expectedActions)
  })
})

// describe('', () => {
//   it('', (done) => {
//     nock(baseURL)
//       .post('/api/submissions')
//       .reply(201, {
//         json: () => ({
          
//         })
//       })
//   })
// })