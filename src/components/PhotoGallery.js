'use strict';

import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import Avatar from 'material-ui/lib/avatar';
import Actions from '../actions/Action';
import appStore from '../stores/AppStore';

class PhotoGallery extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {items: props.items, images: [], tag: 'russia'};

    Actions.requestInstaTagData(this.state.tag);
  }
  componentWillMount() {
    this.appStoreId = appStore.registerView(() => { this.updateState(); });
    this.updateState();
  }

  componentWillUnmount() {
    appStore.deregisterView(this.appStoreId);
  }

  updateState() {
    this.setState({
      images: appStore.get('instaData')
    });
  }

  render() {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        marginBottom: 24,
      },
    };

    return (
      <div style={styles.root}>
        <GridList
          //cellHeight={200}
          cols={5}
          style={styles.gridList}
          >
          {this.state.images.map(tile => (
            <GridTile
              key={tile.low_resolution.url}
              title={tile.featured ? <a href={tile.link} target="_blank">{tile.user_name}</a> : null}
              actionIcon={tile.featured ? <a href={tile.link} target="_blank"><Avatar src={tile.user_profile_picture} style={{marginLeft: 10, marginTop: 15}} /></a> : null} //{<IconButton><StarBorder color="white"/></IconButton>}
              actionPosition="left"
              titlePosition="top"
              titleBackground={tile.featured ? "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)" : null}
              cols={tile.featured ? 2 : 1}
              rows={tile.featured ? 2 : 1}
              onClick={() => {tile.featured = !tile.featured; this.updateState(); }}
              >
              <img src={tile.featured ? tile.standard_resolution.url : tile.low_resolution.url}/>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

PhotoGallery.displayName = 'PhotoGallery';

export default PhotoGallery;
