/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { SignupHeader } from '../SignupHeader'

jest.mock('react-router', () => ({ browserHistory: [] }))

describe('>>> SignupHeader Component Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <SignupHeader
        header1={'TEst HEadline 1'}
        header2={'TEst HEadline 23123123123123'}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})