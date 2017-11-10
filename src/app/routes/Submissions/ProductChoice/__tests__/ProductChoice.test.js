/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { ProductChoice } from '../index'

const submission = {
  type: 'oi',
  clearanceStatus: 'pass'
}

describe('>>> ProductChoice Component --- Snapshot', () => {
  it('+++ product choice page', () => {
    const renderedValue = shallow(
      <ProductChoice
        user={{ broker: 'test-2222-7fd-b3ff-4fd3-9fc2-e752b9f5b002'}}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})