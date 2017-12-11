import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'

function Error(props) {
  return (
    <form>
      <h3>Something Appears to be Wrong</h3>
      <h4>Contact us through the chat icon on the bottom of the screen for assistance.</h4>

      <br />
      <br />
      <ButtonGroup>
        <LinkContainer to="/submissions">
          <Button className="btn"> Return to Submissions</Button>
        </LinkContainer>
      </ButtonGroup>

    </form>
  )
}

export default connect()(Error)