/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Result } from '../index'

jest.mock('app/actions/userActions', () => 'testActions')
jest.mock('app/actions/submissionActions', () => 'testActions')

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
  submission: {
    type: 'oi'
  },
  user: {
    broker: 'test-broker-id'
  }

}

// Snapshot for Home Header Component
describe('>>> Clearance Result Component--- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <Result
        input={initialState.input}
        result={initialState.result}
        submission={initialState.submission}
        handleSubmit={jest.fn()}
        user={initialState.user}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})
