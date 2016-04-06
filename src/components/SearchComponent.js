'use strict';

import React from 'react';
import Actions from '../actions/Action';
import appStore from '../stores/AppStore';
import ReactTypeahead from 'react-typeahead';

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
    function onSearch(event) {
      if (event.target.value.length > 2) {
        appStore.set('search', event.target.value);
        if (event.target.value.startsWith('#')) {
          Actions.requestTagSearch(event.target.value.substr(1));
        } else {
          Actions.requestTagSearch(event.target.value);
          Actions.request4SquareData(event.target.value);
        }
      }
      appStore.set('venues', []);
    }

    function onSelected(o) {
      appStore.set("isRefresh", false);
      if (o.name.startsWith('#')) {
        Actions.requestInstaTagData(o.name.substr(1));
      } else {
        Actions.requestInstaSearch({ latitude: o.location.lat, longitude: o.location.lng });
        appStore.set('lat', o.location.lat); appStore.set('lng', o.location.lng);
      }
    }

    function onRefresh() {
        appStore.set("isRefresh", true);
        Actions.requestInstaSearch({ latitude: appStore.get('lat'), longitude: appStore.get('lng') });
    }

    return (
      <div className="search-component">
          <ReactTypeahead.Typeahead
              name="myTypeahead"
              options={this.state.places}
              maxVisible={15}
              placeholder='Type and select location'
              onKeyUp={ onSearch /*e => { if (e.target.value.length > 2) Actions.request4SquareData(e.target.value); }*/ }
              filterOption={ (input, option) => { /*console.log('filterOption:',input, option);*/ return true; } }
              displayOption={ (option, index) => { /*console.log('displayOption:', option, index);*/ return option.name + ' (' + option.media_count + ')'; }}
              onOptionSelected={ onSelected }
              />
          <button onClick={onRefresh}>Refresh</button>
      </div>
    );
  }
}

SearchComponent.displayName = 'SearchComponent';

// Uncomment properties you need
// SearchComponent.propTypes = {};
// SearchComponent.defaultProps = {};

export default SearchComponent;
