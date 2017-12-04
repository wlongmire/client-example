import React from 'react'
import { Button } from 'react-bootstrap'
import { browserHistory } from 'react-router'

export function AllSet() {
  return (
    <div className="allSet">
      <i className="fa fa-check-circle fa-3" aria-hidden="true" />
      <p> View your homepage to create and edit submissions. </p>
      <Button onClick={() => { return browserHistory.push('/submissions') }}>View Homepage</Button>
    </div>
  )
}

export default AllSet