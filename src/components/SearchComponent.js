'use strict';

import React from 'react';
import Actions from '../actions/Action';
import appStore from '../stores/AppStore';
//import Autosuggest from 'react-autosuggest';
import ReactTypeahead from 'react-typeahead';
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
    let places = this.state.places.map(place => {
      return (
        <li>{place.name}/></li>
      );
    });
    let variants = _.pluck(this.state.places, 'name');
    console.log(this.state.places);
    let onSearch = function() {
      //Actions.requestFlickrData(document.getElementById("search-text").value);
      Actions.request4SquareData(document.getElementById("search-text").value);
      Actions.requestInstaTagData(document.getElementById("search-text").value);
    };
    function getSuggestions(input, callback) {
      //const regex = new RegExp('^' + input, 'i');
      //const suggestions = places.filter(suburb => regex.test(suburb));
      $.ajax({
        url: "https://api.foursquare.com/v2/venues/search?near=" + input + "&client_id=DVIANEZN3RGP1LFGSJNTYYGZKBBSK5PEVMUHUXB0NBGVB5GA&client_secret=WG10HBEMTT5TK5IJOREQHPRGY5YGFZML22SY4D1SY21NY1WH&v=20151215",
        jsonp: "callback",
        dataType: "jsonp"
      }).done(data => {
        return callback(null, data.response.venues);
      });

    }
    function renderSuggestion(suggestion, input) { // In this example, 'suggestion' is a string
      return (                                     // and it returns a ReactElement
          <span><strong>{suggestion.name.slice(0, input.length)}</strong>{suggestion.name.slice(input.length)}</span>
      );
    }
    return (
      <div className="search-component">
        <div>
          <input id="search-text" type="text" />
          <button onClick={onSearch}>Search</button>
        </div>
        <div>
          {/*<Autosuggest suggestions={getSuggestions}
                       suggestionRenderer={renderSuggestion}
                       suggestionValue={item => item.name + ' (' + item.stats.checkinsCount + ')'}
                       showWhen={input => input.trim().length >= 5} />*/}
          {/*<ul>{places}</ul>*/}
          <ReactTypeahead.Typeahead
              name="myTypeahead"
              options={variants}
              maxVisible={15}
              onKeyUp={ e => { if (e.target.value.length > 3) Actions.request4SquareData(e.target.value); } }
              />
        </div>
      </div>
    );
  }
}

SearchComponent.displayName = 'SearchComponent';

// Uncomment properties you need
// SearchComponent.propTypes = {};
// SearchComponent.defaultProps = {};

export default SearchComponent;
