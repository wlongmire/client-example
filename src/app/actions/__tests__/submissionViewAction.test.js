// /* eslint-env node, jest */

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import * as actions from '../submissionActions'
import LocalStorageMock from '../../__mocks__/localStorageMock'
// import {
//   EDIT_SUBMISSION,
// } from 'app/constants/submission'
import { EDIT_SUBMISSION, SUBMISSION_STATUS, CHANGE_SUBMISSION_STATUS } from 'app/constants/submission'

global.userPoolId = {}
jest.mock('../userActions', () => 'testActions')
// import { checkTokenExpiration } from '../../utils/checkTokenExpiration'
// import moduleTest from '../../utils/checkTokenExpiration'
// moduleTest.checkTokenExpiration = jest.fn();

// jest.mock('../../utils/checkTokenExpiration', () => new Promise((resolve) => { resolve({ success: true }) }))
// // mocking local storage
// global.localStorage = new LocalStorageMock()

// // describe('>>> Action - reset Form', () => {
// //   it('successful call should dispatch someAction', () => {
// //     // create mock thunk & store
// //     const createMockStore = configureMockStore([thunk])
// //     // expected results once action is dispatched
// //     const expectedActions = [
// //       { type: EDIT_SUBMISSION, payload: {} },
// //       { payload: { args: ['/oiform'], method: 'push' },
// //         type: '@@router/CALL_HISTORY_METHOD',
// //       },
// //     ]
// //     const initialAppState = {}

// //     const store = createMockStore(initialAppState)

// //     // Act.
// //     store.dispatch(actions.resetForm())

// //     // Assert.
// //     const dispatchedActions = store.getActions()
// //     expect(dispatchedActions).toEqual(expectedActions)
// //   })
// // })

describe('>>> Action - editSubmission', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  // mocking the http request / response
  nock('http://localhost:8888')
    .get('/api/getSubmission/randomId')
    .reply(200, { submission: { _id: 'test123' } })

  it('successful call should dispatch someAction', (done) => {

    // create mock thunk & store
    const createMockStore = configureMockStore([thunk])
    // expected results once action is dispatched
    const expectedActions = [
      { payload: { _id: 'test123' }, type: EDIT_SUBMISSION },
      { type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.EDIT },
      { payload: { args: ['/form'], method: 'push' }, type: '@@router/CALL_HISTORY_METHOD' },
    ]

    const store = createMockStore({})

    // Act.
    store.dispatch(actions.editSubmission({ _id: 'randomId' })).then(() => {
      // Assert.
      const dispatchedActions = store.getActions()
      expect(dispatchedActions).toEqual(expectedActions)
    })
    .then(done)
    .catch(done.fail)
  })
})