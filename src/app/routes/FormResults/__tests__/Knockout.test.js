/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Knockout } from '../Knockout'

const bundleRatings = {
  '13bf709d-0440-4c0a-ac26-5698afc956f2': {
    instantQuote: false,
    reason: [
      'Project cost is > than $30 million.',
      'Anticipated Project Length is > 36 months.'
    ]
  },
  'c8037b9d-0440-4c0a-ac26-5698afc956f2': {
    instantQuote: false,
    reason: [
      'Project cost is > than $30 million.',
      'Anticipated Project Length is > 36 months.'
    ]
  },
  oi: {
    instantQuote: false,
    reason: [
      'Project cost is > than $30 million.',
      'Anticipated Project Length is > 36 months.'
    ]
  }
}

const submission = {
  type: 'oi',
  clearanceStatus: 'pass'
}

describe('>>> Knockout Component with Email Success --- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <Knockout
        submission={submission}
        emailStatus={'SUCCESS'}
        ratings={bundleRatings}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})


describe('>>> Quote Component with Email Pending --- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <Knockout
        submission={submission}
        emailStatus={'PENDING'}
        ratings={bundleRatings}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})