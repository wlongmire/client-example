import React from 'react'
import ControlMaps from './controls'
import {FormControl} from 'react-bootstrap'

class FormSupplementContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ""
    }
  }

  render() {
    const Control = ControlMaps[this.props.data.inputType] || ControlMaps[this.props.data.inputFormat]

    return (
      <div>
        <Control data={this.props.data}/>
      </div>
    )
  }
}

export default FormSupplementContainer