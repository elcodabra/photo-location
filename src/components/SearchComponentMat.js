'use strict';

import React from 'react';
import Actions from '../actions/Action';
import appStore from '../stores/AppStore';
import AutoComplete from 'material-ui/lib/auto-complete';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MapsPlace from 'material-ui/lib/svg-icons/maps/place';
import Search from 'material-ui/lib/svg-icons/action/search';
import Check from 'material-ui/lib/svg-icons/navigation/check';

require('styles//SearchMaterial.less');

class SearchComponentMat extends React.Component {

  componentWillMount() {
    this.appStoreId = appStore.registerView(() => { this.updateState(); });
    this.updateState();
  }

  componentWillUnmount() {
    appStore.deregisterView(this.appStoreId);
  }

  updateState() {
    this.setState({
      places: appStore.get('venues').map( (item) => {
        return {
          text: item.name,
          value: (
            <MenuItem
              leftIcon={ item.location ? <MapsPlace/> : <Search/> }    //&#9839;
              //rightIcon= { <Check/> }
              primaryText={ item.name }
              secondaryText={(<b>{item.media_count}</b>)}
              />
          )
        }
      }),
      venues: appStore.get('venues')
    });
  }

  handleUpdateInput = (searchValue) => {
    appStore.set('venues', []);
    if (searchValue.length > 2) {
      appStore.set('search', searchValue);
      if (searchValue.startsWith('#')) {
        Actions.requestTagSearch(searchValue.substr(1));
      } else {
        Actions.requestTagSearch(searchValue);
        Actions.request4SquareData(searchValue);
      }
    }
    appStore.set('venues', []);
  };

  newRequest = (value) => {
    var venue = _.filter(this.state.venues, {name: value})[0];

    if (!venue.location) {
      Actions.requestInstaTagData(venue.name);
    } else {
      Actions.requestInstaSearch({ latitude: venue.location.lat, longitude: venue.location.lng });
      //appStore.set('lat', venue.location.lat); appStore.set('lng', venue.location.lng);
    }
  };

  render() {
    return (
      <div className="search-component-mat">
        <AutoComplete
          //floatingLabelText="Type and select location or tag"
          hintText="Type and select location or tag"
          animated={true}
          dataSource={this.state.places}
          filter={ AutoComplete.noFilter /*(searchText, key) => searchText !== '' && key.toLowerCase().includes(searchText.toLowerCase())*/ }
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.newRequest}
          style={{ width: '500px' }}
          listStyle={{ width: '500px', textAlign: 'left' }}
          maxSearchResults={5}
          />
      </div>
    );
  }
}

SearchComponentMat.displayName = 'SearchComponentMat';

// Uncomment properties you need
// SearchComponent.propTypes = {};
// SearchComponent.defaultProps = {};

export default SearchComponentMat;
