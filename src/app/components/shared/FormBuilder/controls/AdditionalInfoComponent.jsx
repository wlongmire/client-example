import React, { PropTypes } from 'react'

export function AdditionalInfoComponent(props) {
  const addInfoColor = props.additionalInfo1Color ? props.additionalInfo1Color : '#417505'

  if (props.additionalInfo1 && props.additionalInfo2 && props.additionalInfoIcon) {
    return (
      <div
        className="additional-info-div"
      >
        <div
          className="additional-info-row-1"
          style={{ color: addInfoColor }}
        ><i className="material-icons">{props.additionalInfoIcon}</i>
          <span className="additional-info-1"><b>{props.additionalInfo1}</b></span>
        </div>
        <br />
        <div className="additional-info-row-2">{props.additionalInfo2}</div>
      </div>)
  }

  return (<div />)
}

export default AdditionalInfoComponent

AdditionalInfoComponent.propTypes = {
  additionalInfo1Color: PropTypes.string,
  additionalInfo1: PropTypes.string,
  additionalInfo2: PropTypes.string,
  additionalInfoIcon: PropTypes.string
}