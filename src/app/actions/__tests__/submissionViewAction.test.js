// /* eslint-env node, jest */

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import * as actions from '../submissionActions'
import { editSubmission } from '../submissionActions'
import LocalStorageMock from '../../__mocks__/localStorageMock'
import { SUBMISSION_STATUS, CHANGE_SUBMISSION_STATUS, CHANGE_SUBMISSION } from 'app/constants/submission'

global.apigClient = {
  apiGetSubmissionIdGet: () => {
    console.log('using test PROMISE ================ 6666')
    return Promise.resolve({
      data: {
        success: true,
        submission: {
          _id: 'test123',
          primaryInsuredName: 'Test Name'
        }
      }
    })
  }
}

// global.checkTokenExpiration = () => { return Promise.resolve({ success: true }) }

// MOCKING ****
jest.mock('../userActions', () => 'testActions')
const checkTokenExpiration = jest.fn().mockReturnValue(Promise.resolve({ success: true })) // eslint-disable-line

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

export function fetchTodos() {
  return (dispatch) => {
    return dispatch({
      type: 'test123123',
      payload: {
        submission: 'test123123',
        submissionFormParams: 'test123123'
      }
    })
  }
}

describe('>>> Action - editSubmission', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  // mocking the http request / response
  // nock('http://localhost:8888')
  //   .get('/api/getSubmission/randomId')
  //   .reply(200, { submission: { _id: 'test123' } })
  // var invokeUrl = `https://hotgyzwdq3.execute-api.us-east-1.amazonaws.com/${stageEnv}`;/api/getSubmission/{id}
  nock('https://hotgyzwdq3.execute-api.us-east-1.amazonaws.com/dev')
    .get('/api/getSubmission/randomId')
    .reply(200, { submission: { _id: 'test123' } })

  it('successful call should dispatch someAction', (done) => {
    // create mock thunk & store
    const createMockStore = configureMockStore([thunk])
    // expected results once action is dispatched
    const expectedActions = [
      { type: CHANGE_SUBMISSION,
        payload: { submission: { _id: 'test123', primaryInsuredName: 'Test Name' },
          submissionFormParams: {
            primaryInsuredName: { disabled: true },

            primaryInsuredAddress: { disabled: true },
            primaryInsuredCity: { disabled: true },
            primaryInsuredState: { disabled: true },
            primaryInsuredZipcode: { disabled: true },

            projectAddress: { disabled: true },
            projectCity: { disabled: true },
            projectState: { disabled: true },
            projectZipcode: { disabled: true }
          }
        }
      },
      { type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.EDIT },
      { type: '@@router/CALL_HISTORY_METHOD', payload: { args: ['/form'], method: 'push' } },
    ]

    const store = createMockStore({})

    store.dispatch(editSubmission({ _id: 'randomId' }, 'testUser'))
    .then(() => {
      // Assert.
      const dispatchedActions = store.getActions()
      expect(dispatchedActions).toEqual(expectedActions)
    })

    .then(done)
    .catch(done.fail)
  }, 10000)
})