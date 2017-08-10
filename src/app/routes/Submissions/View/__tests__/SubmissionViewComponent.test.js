/* eslint-env node, jest */

import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import toJson from 'enzyme-to-json'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { SubmissionView } from '../index'

// // Snapshot for Home Header Component
// describe('>>> Header --- Snapshot', () => {
//   it('+++capturing Snapshot of Header without User', () => {
//     const renderedValue = renderer.create(<Header user={null} logout={jest.fn()} resetForm={jest.fn()} />).toJSON()
//     expect(renderedValue).toMatchSnapshot()
//   })
// })

jest.mock('./../../../../actions/userActions', () => 'testActions')
jest.mock('./../../../../actions/submissionActions', () => 'testActions')

const initialState = {
  user: {
    _id: '5807af4bbd9f641100e26138',
    username: 'betamarshuser',
    firstName: 'Marsh',
    lastName: 'Beta',
    role: 'user',
    _brokerId: '5807af2edcba0f490c718471',
    accountPending: false
  },
  submissionData: [
    {
      _id: '59413679bafa390001ced695',
      primaryInsuredName: 'Andriy Kulak',
      totalCost: '$23,213,234',
      quotedPremium: '$21,612',
      totalPremium: '$22,693',
      type: 'ocp',
      updatedAt: '2017-06-14T13:13:29.776Z',
      dateCreated: '06-14-17 09:13am',
      dateUpdated: '06-14-17 09:13am',
      quoteStatus: 'Yes'
    }
  ]
}

// Snapshot for Home Header Component
describe('>>> SubmissionView --- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <SubmissionView
        submissions={initialState.submissionData}
        editSubmission={jest.fn()}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})

describe('>>> SubmissionView--- Shallow + passing the {store} directly', () => {
  let container

  beforeEach(() => {
    container = shallow(
    <SubmissionView
      submissionData={initialState.submissionData}
      editSubmission={jest.fn()}
    />)
  })

  it('+++ check Prop matches with initialState', () => {
    const instance = container.instance()
    expect(instance.props.submissionData[0]._id).toEqual('59413679bafa390001ced695')
  })

  it('+++ check Prop matches with initialState', () => {
    const instance = container.instance()
    expect(instance.props.submissionData[0].primaryInsuredName).toEqual('Andriy Kulak')
  })
})
