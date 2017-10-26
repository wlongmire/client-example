/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { ConfirmSignup } from '../index'

jest.mock('react-router', () => ({ browserHistory: [] }))

describe('>>> ConfirmSignup Component Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <ConfirmSignup
        dispatch={jest.fn()}
        location={{ query: { key: '12123123123' } }}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})