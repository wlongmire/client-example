/* eslint-env node, jest */
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { QuoteBlock } from '../QuoteBlock'

const ratingsWithExcess = {
  additionalCoverage: 125,
  anticipatedProjectLength: 12,
  excessPremium: 10000,
  excessTerrorPremium: 500,
  instantQuote: true,
  premium: 4500,
  rate: 0,
  terrorPremium: 225,
  totalExcessPremium: 10500,
  totalPremium: 4850
}

describe('>>> QuoteBlock Component (OI with excess)--- Snapshot', () => {
  it('+++ tests OI Quote with', () => {
    const renderedValue = shallow(
      <QuoteBlock
        className={'oi primaryPricing'}
        ratings={ratingsWithExcess}
        mainTitle={'Discount, contingent on binding with Builder’s Risk Package'}
        productTitle={'Owners Interest'}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})

const ratingsWithoutExcess = {
  additionalCoverage: 125,
  anticipatedProjectLength: 12,
  excessPremium: 0,
  excessTerrorPremium: 0,
  instantQuote: true,
  premium: 4500,
  rate: 0,
  terrorPremium: 225,
  totalExcessPremium: 0,
  totalPremium: 4850
}

describe('>>> QuoteBlock Component (OI without excess)--- Snapshot', () => {
  it('+++ tests OI Quote with', () => {
    const renderedValue = shallow(
      <QuoteBlock
        className={'ocp primaryPricing'}
        ratings={ratingsWithoutExcess}
        mainTitle={'Discount, contingent on binding with Builder’s Risk Package'}
        productTitle={'Owners Contractors Protective'}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})