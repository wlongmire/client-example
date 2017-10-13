/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { UserManagement } from '../index'

const activeUsers1 = [
  {
    brokerId: 'test-2222-7fd-b3ff-4fd3-9fc2-e752b9f5b002',
    dateCreated: '2017-10-02T19:00:53.150Z',
    email: 'a.ndkulak@gmail.com',
    id: 'ebecd339-54db-415b-b738-47b8afce7fde',
    lastOnline: 'N/A',
    role: 'admin',
    status: 'active',
    username: 'a.ndkulak@gmail.com'
  },
  {
    brokerId: 'test-2222-7fd-b3ff-4fd3-9fc2-e752b9f5b002',
    dateCreated: '2017-10-02T19:00:53.150Z',
    email: 'a.n..dkulak@gmail.com',
    id: '123123-54db-123123-b738-47b8afce7fde',
    lastOnline: 'N/A',
    role: 'admin',
    status: 'active',
    username: 'a.n..dkulak@gmail.com'
  },
]

const partiallyActiveUsers1 = [
  {
    brokerId: 'test-2222-7fd-b3ff-4fd3-9fc2-e752b9f5b002',
    dateCreated: '2017-10-02T19:00:53.150Z',
    email: 'a.ndkulak@gmail.com',
    id: 'ebecd339-54db-415b-b738-47b8afce7fde',
    lastOnline: 'N/A',
    role: 'admin',
    status: 'active',
    username: 'a.ndkulak@gmail.com'
  },
  {
    brokerId: 'test-2222-7fd-b3ff-4fd3-9fc2-e752b9f5b002',
    dateCreated: '2017-10-02T19:00:53.150Z',
    email: 'a.n..dkulak@gmail.com',
    id: '123123-54db-123123-b738-47b8afce7fde',
    lastOnline: 'N/A',
    role: 'admin',
    status: 'disabled',
    username: 'a.n..dkulak@gmail.com'
  },
]

const pendingUsers = [
  {
    brokerId: 'test-2222-7fd-b3ff-4fd3-9fc2-e752b9f5b002',
    dateCreated: '2017-10-11T18:41:14.000Z',
    email: 'allison.e.steranko@gmail.com',
    id: '4cbf72a2-08db-4c32-aa38-500808819b44',
    lastOnline: 'N/A',
    role: 'admin',
    status: 'pending',
    username: 'allison.e.steranko@gmail.com'
  },
  {
    brokerId: 'test-2222-7fd-b3ff-4fd3-9fc2-e752b9f5b002',
    dateCreated: '2017-10-11T18:41:14.000Z',
    email: 'allison.e.steranko@gmail.com',
    id: 'asdasdasd-08db-4c32-aa38-500808819b44',
    lastOnline: 'N/A',
    role: 'admin',
    status: 'pending',
    username: 'asdasdas.e.asdasd@gmail.com'
  },
]

jest.mock('react-router', () => ({ browserHistory: [] }))

describe('>>> UserManagement Component (with Non - Admin)--- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <UserManagement
        user={{ role: 'user' }}
        dispatch={jest.fn()}
        activeUsers={activeUsers1}
        pendingUsers={pendingUsers}
        alertDisplay={{ bsStyle: 'info', message: 'test123', show: false }}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})

describe('>>> UserManagement Component Admin with Active Users --- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <UserManagement
        user={{ role: 'admin' }}
        dispatch={jest.fn()}
        activeUsers={activeUsers1}
        pendingUsers={pendingUsers}
        alertDisplay={{ bsStyle: 'info', message: 'test123', show: false }}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})

describe('>>> UserManagement Component Admin with Active Users & Disabled Users --- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <UserManagement
        user={{ role: 'admin' }}
        dispatch={jest.fn()}
        pendingUsers={pendingUsers}
        activeUsers={partiallyActiveUsers1}
        alertDisplay={{ bsStyle: 'info', message: 'test123', show: false }}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})

