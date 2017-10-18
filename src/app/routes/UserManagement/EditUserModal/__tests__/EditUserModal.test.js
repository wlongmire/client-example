/* eslint-env node, jest */

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { EditUserModal } from '../index'

const loggedInUser = {
  brokerId: 'test-2222-7fd-b3ff-4fd3-9fc2-e752b9f5b002',
  dateCreated: '2017-10-11T18:41:14.000Z',
  email: 'allison.e.steranko@gmail.com',
  id: 'asdasdasd-08db-4c32-aa38-500808819b44',
  lastOnline: 'N/A',
  role: 'admin',
  status: 'active',
  username: 'asdasdas.e.asdasd@gmail.com'
}


const selectedUser = {
  brokerId: 'test-123123-7fd-b3ff-4fd3-9fc2-e752b9f5b002',
  dateCreated: '2017-10-11T18:41:14.000Z',
  email: 'andriy123@gmail.com',
  id: '1123-08db-4c32-aa38-213124',
  lastOnline: 'N/A',
  role: 'admin',
  status: 'pending',
  username: 'asdasdasd.e.asdasd@gmail.com'
}

const selectedUser2 = {
  brokerId: 'test-123123-7fd-b3ff-4fd3-9fc2-e752b9f5b002',
  dateCreated: '2017-10-11T18:41:14.000Z',
  email: 'andriy123@gmail.com',
  id: '1123-08db-4c32-aa38-213124',
  lastOnline: 'N/A',
  role: 'admin',
  status: 'pending',
  username: 'asdasdasd.e.asdasd@gmail.com'
}

describe('>>> EditUserModal Component (Admin)--- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <EditUserModal
        selectedUser={selectedUser}
        loggedInUser={loggedInUser}
        hideEditModal={jest.fn()}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})

describe('>>> EditUserModal Component (Non - Admin)--- Snapshot', () => {
  it('+++capturing Snapshot with', () => {
    const renderedValue = shallow(
      <EditUserModal
        selectedUser={selectedUser2}
        loggedInUser={loggedInUser}
        hideEditModal={jest.fn()}
      />)
    expect(toJson(renderedValue)).toMatchSnapshot()
  })
})