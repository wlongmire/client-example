/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { InputContainer } from '../InputContainer'

const dataProps = {
  attributes: {
    controlGroup: 'projectAddress'
  },
  inputType: 'text',
  inputFormat: 'text',
  name: 'projectCity',
  questionId: '3b',
  placeholder: 'City',
  required: true,
  tooltiptext: 'Please provide as descriptive of a street address as possible.'
}

describe('>>> Input Container Component --- Snapshot', () => {
  it('+++ provide a input field', () => {
    const renderedValue = shallow(
      <InputContainer
        user={{ broker: 'test-2222-7fd-b3ff-4fd3-9fc2-e752b9f5b002' }}
        initialValues={{}}
        initialParams={{}}
        data={dataProps}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})


const initalParamsProps = {
  primaryInsuredAddress: { disabled: true },
  primaryInsuredCity: { disabled: true },
  primaryInsuredName: { disabled: true },
  primaryInsuredState: { disabled: true },
  primaryInsuredZipcode: { disabled: true },
  projectAddress: { disabled: true },
  projectCity: { disabled: true },
  projectState: { disabled: true }
}

const initalValuesProps = {
  clearanceStatus: 'pass',
  primaryInsuredAddress: '234234 23423489',
  primaryInsuredCity: '234234 23423489',
  primaryInsuredName: '234234 23423489',
  primaryInsuredState: 'District of Columbia',
  primaryInsuredZipcode: '234234 23423489',
  projectAddress: '234234 23423489',
  projectCity: '234234 23423489',
  projectState: 'California',
  projectZipcode: '234234 23423489',
  status: 'SUBMISSION',
  type: 'oi'
}

describe('>>> Input Container Component (with inital values) --- Snapshot', () => {
  it('+++ provide a input field (with inital values', () => {
    const renderedValue = shallow(
      <InputContainer
        user={{ broker: 'test-2222-7fd-b3ff-4fd3-9fc2-e752b9f5b002' }}
        initialValues={initalValuesProps}
        initialParams={initalParamsProps}
        data={dataProps}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})