'use strict';

import React from 'react';

require('styles//Photo.less');

class PhotoComponent extends React.Component {
  render() {
    return (
      <div className="photo-component">
        <img src={this.props.imageURL} />
      </div>
    );
  }
}

PhotoComponent.displayName = 'PhotoComponent';

// Uncomment properties you need
// PhotoComponent.propTypes = {};
// PhotoComponent.defaultProps = {};

export default PhotoComponent;
