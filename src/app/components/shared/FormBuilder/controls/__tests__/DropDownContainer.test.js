/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DropDownContainer } from '../DropDownContainer'

const dataProps = {
  attributes: {
    options: [
      { text: 'State', value: '', optionId: '1'},
      { text: 'New York', value: 'New York', optionId: '2'},
      { text: 'New Jersey', value: 'New Jersey', optionId: '3'},
      { text: 'California', value: 'California', optionId: '4'},
    ]
  },
  inputType: 'dropdown-single',
  name: 'projectState',
  placeholder: 'State',
  required: true,
  tooltiptext: 'Please provide as descriptive of a street address as possible.'
}

describe('>>> DropDownContainer Component --- Snapshot', () => {
  it('+++ provide a dropdown field', () => {
    const renderedValue = shallow(
      <DropDownContainer
        user={{ broker: 'test-2222-7fd-b3ff-4fd3-9fc2-e752b9f5b002'}}
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

describe('>>> DropDownContainer Component (with initial params) --- Snapshot', () => {
  it('+++ provide a dropdown field', () => {
    const renderedValue = shallow(
      <DropDownContainer
        user={{ broker: 'test-2222-7fd-b3ff-4fd3-9fc2-e752b9f5b002' }}
        initialValues={initalValuesProps}
        initialParams={initalParamsProps}
        data={dataProps}
        handleSupplementTrigger={jest.fn}
        handleFormChange={jest.fn}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})