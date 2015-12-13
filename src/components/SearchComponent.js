'use strict';

import React from 'react';
import Actions from '../actions/Action';
import * as $ from 'jquery';

require('styles//Search.less');

class SearchComponent extends React.Component {
  render() {
    var onSearch = function() {
      Actions.requestFlickrData(document.getElementById("search-text").value);
      Actions.requestInstaTagData(document.getElementById("search-text").value);
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
