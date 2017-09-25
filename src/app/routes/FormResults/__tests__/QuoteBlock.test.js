/* eslint-env node, jest */
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { QuoteBlock } from '../QuoteBlock'

describe('>>> QuoteBlock Component --- Snapshot', () => {
  it('+++ tests OI Quote with', () => {
    const renderedValue = shallow(
      <QuoteBlock
        additionalCoverage={125}
        className={'oi primaryPricing'}
        terrorismCoverage={225}
        title={'Owners Interest (standard rate)'}
        totalPremium={4850}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})