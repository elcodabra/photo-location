require('normalize.css');
require('styles/App.css');

import React from 'react';
import PhotoGallery from './PhotoGalleryComponent';
import Search from './SearchComponent';
import Actions from '../actions/Action';
import appStore from '../stores/AppStore';
//import Flickr from './Flickr';

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
    let onClickMoreData = function() {
      appStore.set("isRefresh", true);
      Actions.requestInstaTagData(document.getElementById("search-text").value);
    };
    return (
      <div className="index">
        <Search />
        {/*<Flickr/>*/}
        <PhotoGallery items={this.state.items}/>
        <button onClick={onClickMoreData}>Load More Data...</button>
      </div>
    );
  }
}

export default AppComponent;
