import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

class ConfirmSignup extends Component {
  componentDidMount() {
    return apigClient.apiInviteGet({ urlKey: this.props.location.query.key }, {}).then((response, err) => {
      console.log("RESPONSE =====> TESTINGWRWERWE", response)
      console.log("ERROR TESTING ===>", err)
    })
  }
  render() {
    console.log('this.props.location.query.key', this.props.location.query.key)
    const test123 = () => {
      return apigClient.adminUsersPost({}, {
        "email": "andku..l.a.k@gmail.com",
        "broker_id": "test-7fd-b3ff-4fd3-9fc2-e752b9f5b002",
        "role": "admin",
        "status": "pending",
        lastOnline: new Date().toISOString()
      }).then((response) => {
        console.log("RESPONSE =====>", response)
      })
    }
    return (
      <div>
        <Button onClick={() => { return test123() }}>Test123</Button>
        <div>TESTING CONFIRM SIGNUP COMPONENT {this.props.location.query.key}</div>
      </div>
    )
  }
}

export default ConfirmSignup