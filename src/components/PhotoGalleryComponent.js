'use strict';

import React from 'react';
import Photo from './PhotoComponent';

require('styles//PhotoGallery.less');

class PhotoGalleryComponent extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {items: props.items};
  }
  render() {
    var photos = this.state.items.map(function(photo) {
      return <Photo imageURL={photo.url}/>
    });

    return (
      <div className="photogallery-component">
        {photos}
      </div>
    );
  }
}

PhotoGalleryComponent.displayName = 'PhotoGalleryComponent';

// Uncomment properties you need
// PhotoGalleryComponent.propTypes = {};
// PhotoGalleryComponent.defaultProps = {};

export default PhotoGalleryComponent;
