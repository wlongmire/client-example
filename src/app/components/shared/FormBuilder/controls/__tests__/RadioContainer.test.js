/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { RadioContainer } from '../RadioContainer'

const dataProps = {
  attributes: {
    options: [
      { optionId: '1', text: 'Yes', value: true },
      { optionId: '2', text: 'No', value: false },
    ]
  },
  inputType: 'radio',
  name: 'occupancy',
  questionId: '11',
  required: true,
  text: 'Will there be occupancy during the project?'
}

describe('>>> RadioContainer Container Component --- Snapshot', () => {
  it('+++ provide a radio input field', () => {
    const renderedValue = shallow(
      <RadioContainer
        data={dataProps}
        handleSupplementTrigger={jest.fn}
        handleFormChange={jest.fn}
        initialValues={{}}
        initialParams={{}}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})