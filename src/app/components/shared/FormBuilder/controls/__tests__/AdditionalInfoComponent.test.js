/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AdditionalInfoComponent } from '../AdditionalInfoComponent'

describe('>>> AdditionalInfoComponent Component --- Snapshot', () => {
  it('+++ provide a dropdown field', () => {
    const renderedValue = shallow(
      <AdditionalInfoComponent
        additionalInfoIcon={'Additional Info Icon'}
        additionalInfo1={'row 111'}
        additionalInfo2={'row 21123123'}
        additionalInfo1Color={'blue'}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})