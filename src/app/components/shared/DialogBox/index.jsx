import React, { Component } from 'react'
import {
  Modal
} from 'react-bootstrap'
import classnames from 'classnames'

class DialogBox extends Component {
  handleClose() {
    this.props.handleClose()
  }

  render() {
    const { show, title, subtitle, custom_class } = this.props;

    return (
      <Modal
        show={show}
        dialogClassName={classnames(['custom-modal', custom_class])}
      >
        <Modal.Header>
          <Modal.Title>{ title }</Modal.Title>
          <span className="modal-subtitle" >{ subtitle }</span>
        </Modal.Header>

        <Modal.Body>
          { this.props.children }
        </Modal.Body>

      </Modal>
    )
  }
}

DialogBox.defaultProps = {
  show: false,
  title: 'Modal Title'
}

export default DialogBox
