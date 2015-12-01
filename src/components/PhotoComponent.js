'use strict';

import React from 'react';

require('styles//Photo.less');

class PhotoComponent extends React.Component {
  drag(e) {
    console.log("dragStart");
    this.style.opacity = '0.4';
  }
  render() {
    return (
      <div className="photo-component">
        <img src={this.props.imageURL} draggable="true" onClick={this.drag.bind(this)} />
      </div>
    );
  }
}

PhotoComponent.displayName = 'PhotoComponent';

// Uncomment properties you need
// PhotoComponent.propTypes = {};
// PhotoComponent.defaultProps = {};

export default PhotoComponent;
