require('normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
import PhotoGallery from './PhotoGalleryComponent';
import AbsoluteGrid from 'react-absolute-grid/lib/AbsoluteGrid.jsx';
import DisplayObject from './DisplayObjectComponent'
import * as data from './sampleData.js';
import * as _ from 'lodash';

class AppComponent extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {items: props.items, sample: props.sampleItems};
  }
  setItems(items) {
    this.setState({items: items})
  }

  render() {
    // FIXME: see /react-absolute-grid/demo.js
    var screens = data.screens;
    const displayObject = (<DisplayObject/>), zoom = 0.7;

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
      ReactDOM.render(<AppComponent />, document.getElementById('app'));
    };

    var onMoveDebounced = _.debounce(onMove, 80);

    return (
      <div className="index">
        <AbsoluteGrid items={screens}
          displayObject={displayObject}
          onMove={onMoveDebounced}
          dragEnabled={true}
          zoom={zoom}
          responsive={true}
          verticalMargin={42}
          itemWidth={230}
          itemHeight={409}/>
      </div>
    );
  }
}
//<PhotoGallery items={this.state.items}/>

export default AppComponent;
