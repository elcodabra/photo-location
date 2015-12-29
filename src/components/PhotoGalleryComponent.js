'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import AbsoluteGrid from 'react-absolute-grid/lib/AbsoluteGrid.jsx';
import DisplayObject from './DisplayObjectComponent';
import AppComponent from './Main'
import Actions from '../actions/Action';
import appStore from '../stores/AppStore';
import * as _ from 'lodash';

require('styles//PhotoGallery.less');

class PhotoGalleryComponent extends React.Component {
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
        // FIXME: see /react-absolute-grid/demo.js
        /*let images = this.state.images.map(image => {
            return (
                <a className="thumbnail"><img src={image.low_resolution.url}/></a>
            );
        });*/
        var displayObject = (<DisplayObject/>), zoom = 0.7;
        var render = function(){ ReactDOM.render(<AppComponent />, document.getElementById('app')); };
        //Change the item's sort order
        var onMove = function(source, target){
            Actions.sortGridData(source, target);
        };

        var onMoveDebounced = _.debounce(onMove, 80);
        var renderDebounced = _.debounce(render, 150);

        var onZoom = function(event){
            zoom = parseFloat(event.target.value);
            renderDebounced();
        };

        return (
            <div id="photo-gallery" className="photogallery-component">
                <div><h1>{this.state.tag}</h1>{/*images*/}</div>
                <AbsoluteGrid items={this.state.images}
                              displayObject={displayObject}
                              onMove={onMoveDebounced}
                              dragEnabled={true}
                              zoom={zoom}
                              responsive={true}
                              verticalMargin={42}
                              itemWidth={250}
                              itemHeight={250}/>
            </div>
        );
    }
}
//<input onChange={onZoom} type='range' min='0.3' max='1.5' step='0.1' defaultValue={zoom}/>

PhotoGalleryComponent.displayName = 'PhotoGalleryComponent';

export default PhotoGalleryComponent;
