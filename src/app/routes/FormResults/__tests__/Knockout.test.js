/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Knockout } from '../Knockout'

// jest.mock('./../../../../actions/userActions', () => 'testActions')
// jest.mock('./../../../../actions/submissionActions', () => 'testActions')

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

// const userPropsWithBundles = {
//   bundles: [
//     {
//       basePremiumMulitplier: 0.9,
//       quoteScreenMessage: 'RPS discount, contingent on binding with Builder’s Risk Package',
//       pricingSummaryContent: 'RPS discount, contingent on binding with Builder’s Risk Package',
//       productType: 'oi',
//       bindOrderMessage: 'Is the Builders Risk bound with the RPS Package Program?',
//       id: 'c8037b9d-0440-4c0a-ac26-5698afc956f2',
//       name: 'rps'
//     },
//     {
//       basePremiumMulitplier: 1.1,
//       quoteScreenMessage: 'Test discount, contingent on binding with Builder’s Risk Package',
//       pricingSummaryContent: 'Test discount, contingent on binding with Builder’s Risk Package',
//       productType: 'oi',
//       bindOrderMessage: 'Test. Is the Interpol Risk bound with the Bumbling Package Program?',
//       id: '13bf709d-0440-4c0a-ac26-5698afc956f2',
//       name: 'interpol'
//     }
//   ],
//   subId: 'b4a94152-ef9c-40e6-b3b7-8b38fba6ab96',
//   username: 'dummyTest@gmail.com',
//   email: 'dummyTest@gmail.com',
//   broker: 'test-7fd-b3ff-4fd3-9fc2-e752b9f5b002',
//   expiration: 'dummyExpiration'
// }

// const userPropsWithoutBundles = {
//   bundles: [],
//   subId: 'b4a94152-ef9c-40e6-b3b7-8b38fba6ab96',
//   username: 'dummyTest@gmail.com',
//   email: 'dummyTest@gmail.com',
//   broker: 'test-7fd-b3ff-4fd3-9fc2-e752b9f5b002',
//   expiration: 'dummyExpiration'
// }

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