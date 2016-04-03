require('normalize.css');
require('styles/App.css');

import React from 'react';
import PhotoGallery from './PhotoGalleryComponent';
import Search from './SearchComponentMat';

class AppComponent extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {items: []};
  }
  setItems(items) {
    this.setState({items: items})
  }

  render() {
    return (
      <div className="index">
        <Search />
        <PhotoGallery items={this.state.items}/>
      </div>
    );
  }
}

export default AppComponent;
