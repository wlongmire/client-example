/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Loading } from '../index'

jest.mock('./../../../../actions/userActions', () => 'testActions')
jest.mock('./../../../../actions/submissionActions', () => 'testActions')

const initialState = {
  result: {},
  input: {
    insuredAddress: {
      primaryInsuredAddress: 'Test 999',
      primaryInsuredState: 'New York',
      primaryInsuredCity: 'Test 999',
      primaryInsuredZipcode: 'Test 999',
    },
    primaryInsuredName: 'Test 999',
    projectAddress: {
      projectAddress: 'Test 999',
      projectCity: 'Test 999',
      projectState: 'California',
      projectZipcode: 'Test 999'
    }
  },
  user: {
    broker: 'test-broker-id'
  }

}

// Snapshot for Home Header Component
describe('>>> Clearance Result Component--- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <Loading
        input={initialState.input}
        handleSubmit={jest.fn()}
        user={initialState.user}
        handleCancel={jest.fn()}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})
