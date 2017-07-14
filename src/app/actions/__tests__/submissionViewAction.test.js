// /* eslint-env node, jest */

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import * as actions from '../submissionActions'
import { editSubmission } from '../submissionActions'
import LocalStorageMock from '../../__mocks__/localStorageMock'
// import {
//   EDIT_SUBMISSION,
// } from 'app/constants/submission'
import { EDIT_SUBMISSION, SUBMISSION_STATUS, CHANGE_SUBMISSION_STATUS, CHANGE_SUBMISSION } from 'app/constants/submission'

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
jasmine.getEnv().defaultTimeoutInterval = 10000;

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

jest.mock('../userActions', () => 'testActions')
jest.mock('../../utils/checkTokenExpiration', () => { return Promise.resolve({ success: true }) })
// import { checkTokenExpiration } from '../../utils/checkTokenExpiration'
// checkTokenExpiration = () => {
//   return Promise.resolve({ success: true })
// }

// checkTokenExpiration =
  // return Promise.resolve({ success: true })

// import moduleTest from '../../utils/checkTokenExpiration'
// checkTokenExpiration = jest.fn()

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

    // function checkTokenExpiration() {
    //   return Promise.resolve({ success: true })
    // }

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

    // Act.

    store.dispatch(editSubmission({ _id: 'randomId' }))
    .then(()=>{
      console.log("GETTING HERE  99999999999999")
      // Assert.
      const dispatchedActions = store.getActions()
      expect(dispatchedActions).toEqual(expectedActions)
    })
    //    setTimeout(function(){
    //   console.log("GETTING HERE  99999999999999")
    //   // Assert.
    //   const dispatchedActions = store.getActions()
    //   expect(dispatchedActions).toEqual(expectedActions)
    //   .then(done)
    // .catch(done.fail)
    // }, 1000);


    // store.dispatch(fetchTodos({ _id: 'randomId' }))
    // console.log("GETTING HERE  99999999999999")
    // // Assert.
    // const dispatchedActions = store.getActions()
    // expect(dispatchedActions).toEqual(expectedActions)

    .then(done)
    .catch(done.fail)
  }, 10000)
})

    // const expectedActions = [
    //   { payload: { subission: { _id: 'test123' },
    //     // submissionFormParams: {
    //     //   primaryInsuredName: { disabled: true },

    //     //   primaryInsuredAddress: { disabled: true },
    //     //   primaryInsuredCity: { disabled: true },
    //     //   primaryInsuredState: { disabled: true },
    //     //   primaryInsuredZipcode: { disabled: true },

    //     //   projectAddress: { disabled: true },
    //     //   projectCity: { disabled: true },
    //     //   projectState: { disabled: true },
    //     //   projectZipcode: { disabled: true }
    //     // }
    //   }, type: EDIT_SUBMISSION },
    //   { type: CHANGE_SUBMISSION_STATUS, status: SUBMISSION_STATUS.EDIT },
    //   { 