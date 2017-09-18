/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Quote } from '../Quote'

// jest.mock('./../../../../actions/userActions', () => 'testActions')
// jest.mock('./../../../../actions/submissionActions', () => 'testActions')

const bundleRatings = {
  '13bf709d-0440-4c0a-ac26-5698afc956f2': {
    additionalCoverage: 125,
    anticipatedProjectLength: 12,
    excessPremium: 0,
    excessTerrorPremium: 0,
    instantQuote: true,
    premium: 4950,
    rate: 0,
    terrorPremium: 248,
    totalExcessPremium: 0,
    totalPremium: 5323
  },
  'c8037b9d-0440-4c0a-ac26-5698afc956f2': {
    additionalCoverage: 250,
    anticipatedProjectLength: 12,
    excessPremium: 0,
    excessTerrorPremium: 0,
    instantQuote: true,
    premium: 6950,
    rate: 0,
    terrorPremium: 248,
    totalExcessPremium: 0,
    totalPremium: 7323
  },
  oi: {
    additionalCoverage: 125,
    anticipatedProjectLength: 12,
    excessPremium: 20000,
    excessTerrorPremium: 1000,
    instantQuote: true,
    premium: 4500,
    rate: 0,
    terrorPremium: 225,
    totalExcessPremium: 21000,
    totalPremium: 4850
  }
}

const submission = {
  type: 'oi',
  clearanceStatus: 'pass'
}

const userPropsWithBundles = {
  bundles: [
    {
      basePremiumMulitplier: 0.9,
      quoteScreenMessage: 'RPS discount, contingent on binding with Builder’s Risk Package',
      pricingSummaryContent: 'RPS discount, contingent on binding with Builder’s Risk Package',
      productType: 'oi',
      bindOrderMessage: 'Is the Builders Risk bound with the RPS Package Program?',
      id: 'c8037b9d-0440-4c0a-ac26-5698afc956f2',
      name: 'rps'
    },
    {
      basePremiumMulitplier: 1.1,
      quoteScreenMessage: 'Test discount, contingent on binding with Builder’s Risk Package',
      pricingSummaryContent: 'Test discount, contingent on binding with Builder’s Risk Package',
      productType: 'oi',
      bindOrderMessage: 'Test. Is the Interpol Risk bound with the Bumbling Package Program?',
      id: '13bf709d-0440-4c0a-ac26-5698afc956f2',
      name: 'interpol'
    }
  ],
  subId: 'b4a94152-ef9c-40e6-b3b7-8b38fba6ab96',
  username: 'dummyTest@gmail.com',
  email: 'dummyTest@gmail.com',
  broker: 'test-7fd-b3ff-4fd3-9fc2-e752b9f5b002',
  expiration: 'dummyExpiration'
}

const userPropsWithoutBundles = {
  bundles: [],
  subId: 'b4a94152-ef9c-40e6-b3b7-8b38fba6ab96',
  username: 'dummyTest@gmail.com',
  email: 'dummyTest@gmail.com',
  broker: 'test-7fd-b3ff-4fd3-9fc2-e752b9f5b002',
  expiration: 'dummyExpiration'
}

describe('>>> Quote Component with Bundles --- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <Quote
        submission={submission}
        user={userPropsWithBundles}
        emailStatus={'SUCCESS'}
        ratings={bundleRatings}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})


describe('>>> Quote Component without Bundles --- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <Quote
        submission={submission}
        user={userPropsWithoutBundles}
        emailStatus={'SUCCESS'}
        ratings={bundleRatings}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})