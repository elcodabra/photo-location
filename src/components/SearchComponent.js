'use strict';

import React from 'react';
import * as $ from 'jquery';

require('styles//Search.less');

class SearchComponent extends React.Component {
  render() {
    var onSearch = function() {
      $.ajax({
        url: "https://api.instagram.com/v1/media/search?lat=48.858093&lng=2.294694&client_id=e050a30d1667451cbc3598f3cce20530",

        // The name of the callback parameter, as specified by the YQL service
        jsonp: "callback",

        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",

        // Work with the response
        success: function( response ) {
          console.log( response ); // server response
        }
      });
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
