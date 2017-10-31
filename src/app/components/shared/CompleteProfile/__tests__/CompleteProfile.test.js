/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { CompleteProfile } from '../index'

jest.mock('react-router', () => ({ browserHistory: [] }))

describe('>>> Set Password Component Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <CompleteProfile
        goToNextStep={jest.fn()}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})