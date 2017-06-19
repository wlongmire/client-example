/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Input from '../index'

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
describe('>>> Clearance Component --- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <Input
        submissions={initialState.submissionData}
        handleSubmit={jest.fn()}
        getSubmissions={jest.fn()}
        user={initialState.submissionData}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})
