'use strict';

import React from 'react';

require('styles//Modal.less');

class ModalComponent extends React.Component {
  render() {
    return (
      <div className="modal-component">
        <div className="lightbox" id={'image'+this.props.id}>
          <div className="box">
            <a className="close" href="#">X</a>
            <p className="title">View Image</p>
            <div className="content">
              <img src={this.props.imageURL} />
            </div>
          </div>
        </div>
      </div>

    );
  }
}

ModalComponent.displayName = 'ModalComponent';

// Uncomment properties you need
// ModalComponent.propTypes = {};
// ModalComponent.defaultProps = {};

export default ModalComponent;
