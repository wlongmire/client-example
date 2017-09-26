/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Quote } from '../Quote'

const oiBundleRatingsTwoProps = {
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


const oiBundleRatingsOneProp = {
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

const oiBundleRatingsOneWithExcessProp = {
  '13bf709d-0440-4c0a-ac26-5698afc956f2': {
    additionalCoverage: 125,
    anticipatedProjectLength: 12,
    excessPremium: 10000,
    excessTerrorPremium: 1000,
    instantQuote: true,
    premium: 4950,
    rate: 0,
    terrorPremium: 248,
    totalExcessPremium: 11000,
    totalPremium: 5323
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


const ocpRatingsProp = {
  ocp: {
    additionalCoverage: null,
    anticipatedProjectLength: 12,
    excessPremium: null,
    excessTerrorPremium: null,
    instantQuote: true,
    premium: 10720,
    rate: 0.87,
    terrorPremium: 536,
    totalExcessPremium: null,
    totalPremium: 11256
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

const ocpSubmission = {
  type: 'ocp',
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

describe('>>> Quote Component with OCP Rating --- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <Quote
        submission={ocpSubmission}
        user={userPropsWithBundles}
        emailStatus={'SUCCESS'}
        ratings={ocpRatingsProp}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})


describe('>>> Quote Component with Two Bundles (with Success Email) --- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <Quote
        submission={submission}
        user={userPropsWithBundles}
        emailStatus={'SUCCESS'}
        ratings={oiBundleRatingsTwoProps}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})

describe('>>> Quote Component with One Bundle (with Success Email) --- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <Quote
        submission={submission}
        user={userPropsWithBundles}
        emailStatus={'SUCCESS'}
        ratings={oiBundleRatingsOneProp}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})

describe('>>> Quote Component with One Bundle and Excess (with Success Email) --- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <Quote
        submission={submission}
        user={userPropsWithBundles}
        emailStatus={'SUCCESS'}
        ratings={oiBundleRatingsOneWithExcessProp}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})

describe('>>> Quote Component with Bundles (with Pending Email) --- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <Quote
        submission={submission}
        user={userPropsWithBundles}
        emailStatus={'PENDING'}
        ratings={oiBundleRatingsTwoProps}
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
        ratings={oiBundleRatingsTwoProps}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})