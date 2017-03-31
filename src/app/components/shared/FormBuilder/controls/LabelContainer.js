import React from 'react'
import {
  ControlLabel, 
  Tooltip, 
  OverlayTrigger
} from 'react-bootstrap'

class LabelContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <ControlLabel>{this.props.data.text}</ControlLabel>
    )
  }
}

export default LabelContainer