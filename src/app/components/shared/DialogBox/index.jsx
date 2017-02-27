import React from 'react';
import {
  Modal,
  Button
} from 'react-bootstrap';
import classnames from 'classnames';

const DialogBox = React.createClass({
  handleClose () {
    this.props.handleClose();
  },

  defaultProps () {
    return {
      show: false,
      title: 'Modal Title'
    };
  },

  render: function () {
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
    );
  }
});

export default DialogBox;
