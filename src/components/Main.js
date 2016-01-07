require('normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
import PhotoGallery from './PhotoGalleryComponent';
import Canvas from './CanvasComponent';
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

  clearCanvas() {
    appStore.set('images_edit',[]);
  }

  onClickMoreData() {
    appStore.set("isRefresh", true);
    Actions.requestInstaTagData(document.getElementById("search-text").value);
  };

  render() {
    return (
      <div className="index">
        <Search />
        <Canvas width={'640px'} height={'640px'}/>
        <button onClick={this.clearCanvas}>Clear</button>
        {/*<Flickr/>*/}
        <PhotoGallery items={this.state.items}/>
        <button onClick={this.onClickMoreData}>Load More Data...</button>
      </div>
    );
  }
}

export default AppComponent;
