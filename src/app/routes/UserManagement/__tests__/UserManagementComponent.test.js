/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { UserManagement } from '../index'

describe('>>> UserManagement Component (with Broker)--- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <UserManagement
        user={{ role: 'broker' }}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})

describe('>>> UserManagement Component (with NON- Broker)--- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <UserManagement
        user={{ role: 'user' }}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})