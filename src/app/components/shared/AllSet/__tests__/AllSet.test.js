/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AllSet } from '../index'

jest.mock('react-router', () => ({ browserHistory: [] }))

describe('>>> AllSet Component Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <AllSet />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})