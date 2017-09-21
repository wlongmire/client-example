import React, { PropTypes } from 'react'
import {
  ControlLabel
} from 'react-bootstrap'

class LabelContainer extends React.Component {

  render() {
    return (
      <ControlLabel>{this.props.data.text}</ControlLabel>
    )
  }
}

LabelContainer.propTypes = {
  data: PropTypes.object
}

export default LabelContainer