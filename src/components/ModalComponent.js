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
            <a className="title" href={this.props.currentImage.link}>{this.props.currentImage.link}</a>
            <div className="content">
              <img src={this.props.currentImage.standard_resolution ? this.props.currentImage.standard_resolution.url : ''} />
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
