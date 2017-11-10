/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { ProductChoiceItem } from '../ProductChoiceItem'

describe('>>> ProductChoiceItem Component --- Snapshot', () => {
  it('+++ OCP in product choice page', () => {
    const renderedValue = shallow(
      <ProductChoiceItem
        broker={'test-2222-7fd-b3ff-4fd3-9fc2-e752b9f5b002'}
        description={'Random Description text'}
        name={'Owners and Contractors Protective'}
        type={'ocp'}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})

describe('>>> ProductChoiceItem Component --- Snapshot', () => {
  it('+++ OI in product choice page', () => {
    const renderedValue = shallow(
      <ProductChoiceItem
        broker={'test-2222-7fd-b3ff-4fd3-9fc2-e752b9f5b002'}
        description={'Random Description text'}
        name={'Owners Interest'}
        type={'oi'}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})

// describe('>>> Quote Component with Email Pending --- Snapshot', () => {
//   it('+++capturing Snapshot with', () => {
//     const renderedValue = shallow(
//       <Knockout
//         submission={submission}
//         emailStatus={'PENDING'}
//         ratings={bundleRatings}
//       />)
//     expect(toJson(renderedValue)).toMatchSnapshot()
//   })
// })