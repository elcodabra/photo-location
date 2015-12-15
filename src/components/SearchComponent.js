'use strict';

import React from 'react';
import Actions from '../actions/Action';
import appStore from '../stores/AppStore';
import * as $ from 'jquery';

require('styles//Search.less');

class SearchComponent extends React.Component {

  componentWillMount() {
    this.appStoreId = appStore.registerView(() => { this.updateState(); });
    this.updateState();
  }

  componentWillUnmount() {
    appStore.deregisterView(this.appStoreId);
  }

  updateState() {
    this.setState({
      places: appStore.get('venues')
    });
  }

  render() {
    let places = this.state.places;
    console.log(places);
    var onSearch = function() {
      //Actions.requestFlickrData(document.getElementById("search-text").value);
      Actions.requestInstaTagData(document.getElementById("search-text").value);
      Actions.request4SquareData(document.getElementById("search-text").value);
    };
    return (
      <div className="search-component">
        <input id="search-text" type="text" />
        <button onClick={onSearch}>Search</button>
      </div>
    );
  }
}

SearchComponent.displayName = 'SearchComponent';

// Uncomment properties you need
// SearchComponent.propTypes = {};
// SearchComponent.defaultProps = {};

export default SearchComponent;
