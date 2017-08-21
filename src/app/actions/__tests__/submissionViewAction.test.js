// /* eslint-env node, jest */

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import * as actions from '../submissionActions'
import { editSubmission, saveSubmission } from '../submissionActions'
import LocalStorageMock from '../../__mocks__/localStorageMock'
import { SUBMISSION_STATUS, CHANGE_SUBMISSION_STATUS, CHANGE_SUBMISSION } from './../../constants/submission'

// global.checkTokenExpiration = () => { return Promise.resolve({ success: true }) }

// MOCKING HTTP REQUESTS FOR FUTURE
  // mocking the http request / response
  // nock('http://localhost:8888')
  //   .get('/api/getSubmission/randomId')
  //   .reply(200, { submission: { _id: 'test123' } })
  // var invokeUrl = `https://hotgyzwdq3.execute-api.us-east-1.amazonaws.com/${stageEnv}`;/api/getSubmission/{id}

// MOCKING ****
jest.mock('../userActions', () => 'testActions')
const checkTokenExpiration = jest.fn().mockReturnValue(Promise.resolve({ success: true })) // eslint-disable-line
global.apigClient = {
  apiGetSubmissionIdGet: () => {
    return Promise.resolve({
      data: {
        success: true,
        submission: {
          _id: 'test123',
          primaryInsuredName: 'Test Name'
        }
      }
    })
  },
  apiSavePost: () => {
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

describe('>>> Action - saveSubmission', () => {
  it('SAVE SUBMISSION *****', () => {
    // expect(
    //   saveSubmission({ submission: 'bar' }, { id: 'test213234234' })
    // ).toEqual({ submission: {}, submissionFormParams: {} })

    expect.assertions(1)
    return saveSubmission(
      { submission: {
        primaryInsuredName: 'Test Name'
      } },
      { id: 'test123' })
      .then(data => expect(data).toEqual(
        { data: {
          submission: {
            _id: 'test123',
            primaryInsuredName: 'Test Name'
          },
          success: true }
        }))
  })
})


describe('>>> Action - editSubmission', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  nock('https://4svl68k4k5.execute-api.us-east-1.amazonaws.com/dev')
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