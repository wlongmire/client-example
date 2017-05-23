/* eslint-env node, jest */

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as actions from '../actions'
import LocalStorageMock from '../../../__mocks__/localStorageMock'
import { 
  FETCH_SUBMISSIONS, 
  USER_LOGGED_OUT, 
  EDIT_SUBMISSION 
} from 'app/constants/user'
import constants from 'app/constants/app'


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
  it('successful call should dispatch someAction', () => {
    const submission = {
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