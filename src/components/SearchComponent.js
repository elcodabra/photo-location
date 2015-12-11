'use strict';

import React from 'react';

require('styles//Search.less');

class SearchComponent extends React.Component {
  render() {
    var onSearch = function() {
      console.log("Search...");
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
