'use strict';

import React from 'react';
import * as $ from 'jquery';
import JSZip from 'jszip';
import ReactTypeahead from 'react-typeahead';
import imageToURI from '../lib/ImageDataUri';
import FileSaver from '../lib/FileSaver';
import Actions from '../actions/Action';
import appStore from '../stores/AppStore';

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
    let onSearch = function(o) {
        appStore.set("isRefresh", false);
        Actions.requestInstaSearch({ latitude: o.location.lat, longitude: o.location.lng });
        appStore.set('lat', o.location.lat);
        appStore.set('lng', o.location.lng);
    };
    let onSearchTag = function(elem) {
        //Actions.requestInstaTagData(document.getElementById("search-text").value);
        appStore.set("isRefresh", false);
        Actions.requestInstaTagData(document.getElementById("search-text").value);
    };
    let onRefresh = function() {
        appStore.set("isRefresh", true);
        Actions.requestInstaSearch({ latitude: appStore.get('lat'), longitude: appStore.get('lng') });
    };
    let onSave = function() {
        let zip = new JSZip();
        let images = appStore.get("instaData").map( image => {
            return new Promise( (resolve, reject) => {
                imageToURI(image.standard_resolution.url, (err, uri) => {
                    if (!err) {
                        zip.file(image.sort + ".jpg", uri, {base64: true});
                        //resolve(uri);
                        resolve();
                    }
                });
            });
        });
        Promise.all(images).then( () => {
            console.log('Promises All!');
            var content = zip.generate({type:"blob"});
            FileSaver.saveAs(content, "insta_photos.zip");
        });
    };

    return (
        <div className="search-component">
            {/*<ReactTypeahead.Typeahead
                name="myTypeahead"
                options={this.state.places}
                maxVisible={15}
                placeholder='Type and select location'
                onKeyUp={ e => { if (e.target.value.length > 3) Actions.request4SquareData(e.target.value); } }
                filterOption={ (input, option) => { return true; } }
                displayOption={ (option, index) => { return option.name + '(' + option.stats.checkinsCount + ')'; }}
                onOptionSelected={ onSearch }
                />
            <button onClick={onRefresh}>Refresh</button>*/}
            <input id="search-text" type="text" />
            <button onClick={onSearchTag}>Search by Tag</button>
            <button onClick={onSave}>Save</button>
        </div>
    );
  }
}

SearchComponent.displayName = 'SearchComponent';

// Uncomment properties you need
// SearchComponent.propTypes = {};
// SearchComponent.defaultProps = {};

export default SearchComponent;
