import React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default function PendingStatus() {
  return (
    <div>
      <div className="pendingTitle">
        <h3>We&apos;ve received your submission</h3>
      </div>
      <div className="pendingBlock">
        <div className="pendingFirstRow">Pricing will be emailed after clearance is confirmed.</div>
        <div>We must review this against a similar submission(s) that has been found.</div>
        <div>Please email Jessica Buelow (jbuelow@colonyspecialty.com) with any questions.</div>
      </div>
      <br />
      <ButtonGroup>
        <LinkContainer to="/submissions">
          <Button className="btn"> Return to Submissions</Button>
        </LinkContainer>
      </ButtonGroup>
    </div>
  )
}