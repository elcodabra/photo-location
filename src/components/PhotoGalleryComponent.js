'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import AbsoluteGrid from 'react-absolute-grid/lib/AbsoluteGrid.jsx';
import DisplayObject from './DisplayObjectComponent';
import AppComponent from './Main'
import * as _ from 'lodash';

require('styles//PhotoGallery.less');

class PhotoGalleryComponent extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {items: props.items};
  }
  render() {
    // FIXME: see /react-absolute-grid/demo.js
    var screens = this.state.items.screens;
    var displayObject = (<DisplayObject/>), zoom = 0.7;
    var render = function(){ ReactDOM.render(<AppComponent />, document.getElementById('app')); };
    //Change the item's sort order
    var onMove = function(source, target){
      source = _.find(screens, {key: parseInt(source, 10)});
      target = _.find(screens, {key: parseInt(target, 10)});

      var targetSort = target.sort;

      //CAREFUL, For maximum performance we must maintain the array's order, but change sort
      screens.forEach(function(item){
        //Decrement sorts between positions when target is greater
        if(target.sort > source.sort && (item.sort <= target.sort && item.sort > source.sort)){
          item.sort --;
          //Incremenet sorts between positions when source is greator
        }else if(item.sort >= target.sort && item.sort < source.sort){
          item.sort ++;
        }
      });

      source.sort = targetSort;
      render();
    };

    var onMoveDebounced = _.debounce(onMove, 80);
    var renderDebounced = _.debounce(render, 150);

    var onZoom = function(event){
      zoom = parseFloat(event.target.value);
      renderDebounced();
    };

    return (
      <div id="photo-gallery" className="photogallery-component">
        <AbsoluteGrid items={screens}
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
