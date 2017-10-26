/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { SetPassword } from '../SetPassword'

jest.mock('react-router', () => ({ browserHistory: [] }))

describe('>>> Set Password Component Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <SetPassword
        dispatch={jest.fn()}
        cognitoUser={{ username: 'andkulak@gmail.com' }}
        userAttributes={{ email: 'andk123123q2@gmail.com' }}
        location={{ query: { key: '12123123123' } }}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})