/* eslint-env node, jest */

import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import toJson from 'enzyme-to-json'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { Header } from '../index'

jest.mock('app/actions/userActions', () => 'testActions')

// Snapshot for Home Header Component
describe('>>> Header --- Snapshot', () => {
  beforeEach(() => {
    global.userPool = {}
    global.userPoolId = '123123123'
  })

  it('+++capturing Snapshot of Header without User', () => {
    const renderedValue = renderer.create(
      <Header
        user={null}
        logout={jest.fn()}
        resetForm={jest.fn()}
      />).toJSON()

    expect(renderedValue).toMatchSnapshot()
  })
})

// Snapshot for Home Header Component
describe('>>> Header --- Snapshot', () => {
  beforeEach(() => {
    global.userPool = {}
    global.userPoolId = '123123123'
  })

  it('+++capturing Snapshot of Header with User', () => {
    const renderedValue = renderer.create(
      <Header 
        user={initialState.user}
        logout={jest.fn()}
        resetForm={jest.fn()}
      />).toJSON()
    
    expect(renderedValue).toMatchSnapshot()
  })
})

const initialState = { user: {
  _id: '5807af4bbd9f641100e26138',
  username: 'betamarshuser',
  firstName: 'Marsh',
  lastName: 'Beta',
  role: 'user',
  _brokerId: '5807af2edcba0f490c718471',
  accountPending: false }
}

describe('>>> Header--- Shallow + passing the {store} directly', () => {
  let container

  beforeEach(() => {
    global.userPool = {}
    global.userPoolId = '123123123'

    container = shallow(
      <Header
        user={initialState.user}
        logout={jest.fn()}
        resetForm={jest.fn()}
      />)
  })

  it('+++ check Prop matches with initialState', () => {
    beforeEach(() => {
      global.userPool = {}
      global.userPoolId = '123123123'
    })

    const instance = container.instance()
    expect(instance.props.user.username).toEqual('betamarshuser')
  })

  it('+++ check Prop matches with initialState', () => {
    beforeEach(() => {
      global.userPool = {}
    })

    const instance = container.instance()
    expect(instance.props.user.lastName).toEqual('Beta')
  })
})
