'use strict';

import React from 'react';
import Actions from '../actions/Action';
import appStore from '../stores/AppStore';
import AutoComplete from 'material-ui/lib/auto-complete';
import MapsPlace from 'material-ui/lib/svg-icons/maps/place';
import Search from 'material-ui/lib/svg-icons/action/search';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
//import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';

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
      places: appStore.get('venues').map( (item, index) => {
        let props = {};
        if ( item.location_id )
          props.leftIcon = <MapsPlace color={Colors.grey500} backgroundColor={Colors.transparent}/>;
        else
          props.leftAvatar = <Avatar color={Colors.grey500} backgroundColor={Colors.transparent} style={{left: 10, top: 5}}>#</Avatar>; //&#9839;
        return {
          text: item.name,
          value: (
            <MenuItem
              //ref={`selectElement${index}`}
              {...props}
              primaryText={ item.name }
              onTouchTap={ () => this.newRequest(item) }
              innerDivStyle={{ paddingLeft: '55px' }}
            />
            /*
            <ListItem
              {...props}
              primaryText={ item.name }
              disableKeyboardFocus={true}
              //secondaryText={(<b>{item.media_count}</b>)}
              onTouchTap={ () => this.newRequest(item) }
              innerDivStyle={{ paddingLeft: '55px' }}
              onKeyboardFocus={ (e) => { console.log(e) } }
            />
            */
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
        //Actions.request4SquareData(searchValue);
        Actions.requestPlacesAutocomplete(searchValue);
      }
    }
    appStore.set('venues', []);
  };

  newRequest = (value) => {
    if (!value.location_id) {
      Actions.requestInstaTagData(value.name);
    } else {
      Actions.requestPlacesLocation({ place_id: value.location_id });
    }
  };

  render() {
    return (
      <div className="search-component-mat">
        <AutoComplete
          floatingLabelText="Type and select location or tag"
          //hintText="Type and select location or tag"
          animated={true}
          dataSource={this.state.places}
          filter={ AutoComplete.noFilter /*(searchText, key) => searchText !== '' && key.toLowerCase().includes(searchText.toLowerCase())*/ }
          onUpdateInput={this.handleUpdateInput}
          //onKeyUp={(e) => { console.log(this.refs); }}
          //onNewRequest={this.newRequest}
          style={{ width: '500px' }}
          listStyle={{ width: '500px', textAlign: 'left' }}
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
