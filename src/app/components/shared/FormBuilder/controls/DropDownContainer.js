import React from 'react'
import classnames from 'classnames'
import {
  FormGroup,
  DropdownButton,
  MenuItem,
  ControlLabel,
  Tooltip,
  OverlayTrigger,
  FormControl
} from 'react-bootstrap'


class DropDownContainer extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.getValidationState = this.getValidationState.bind(this)
  }

  getValidationState() {
    // this bit of code acts as a circuit breaker
    // We want get validation to trigger a validation function and when results are back we need to call it again
    // But this breaks the loops
    if (this.state.isValid) {
      let isValid = this.state.isValid
      this.state.isValid = null
      return isValid
    }
  }

  componentWillMount() {
    this.setState({
      title: this.props.data.placeholder,
      value: this.props.data.attributes.options[0].value
    })
  }

  handleChange(e) {

    let option = this.props.data.attributes.options.filter((option) => {
      return option.text === e.currentTarget.value
    })[0]

    if(option.supplementalquestionIds && option.supplementalquestionIds.length > 0) {
      this.props.handleSupplementTrigger(option.supplementalquestionIds)
    } else {
      this.props.handleSupplementTrigger([])
    }
    // Change dropdown title on select
    this.setState({
      title: event,
      value: option.value
    })

    this.props.handleFormChange()
  }

  render() {
    const tooltip = <Tooltip id={`tooltip_${this.props.data.questionId}`}> {this.props.data.tooltiptext}</Tooltip>

    this.options = this.props.data.attributes.options.map((data) => {
      return <option value={this.props.data.text} key={data.optionId}>{data.text}</option>
    })

    return(
       <FormGroup validationState={this.getValidationState()} controlId={this.props.data.name}>
         { this.props.data.text && <ControlLabel>{this.props.data.text}</ControlLabel> }
         
         <OverlayTrigger placement='top' overlay={tooltip} trigger={(this.props.data.tooltiptext) ? ['hover', 'focus'] : null}>
           <div className="select">
            <FormControl className={this.state.value && "filled"} onChange={this.handleChange} componentClass="select">
              {this.options}
            </FormControl>
          </div>
        </OverlayTrigger>
       </FormGroup>
    )
  }
}

export default DropDownContainer