require('normalize.css');
require('styles/App.css');

import React from 'react';
import PhotoGallery from './PhotoGalleryComponent';
import AbsoluteGrid from 'react-absolute-grid/lib/AbsoluteGrid.jsx';
import DisplayObject from './DisplayObjectComponent'
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
    const screens = [
      {'url': 'http://invisionapp.com/subsystems/do_ui_kit/assets/img/screens/original-1x/screen-1-1-login.jpg', 'name': 'login', 'sort': 1, 'key': 1},
      {'url': 'http://invisionapp.com/subsystems/do_ui_kit/assets/img/screens/original-1x/screen-1-2-sign-up.jpg', 'name': 'signup', 'sort': 2, 'key': 2},
      {'url': 'http://invisionapp.com/subsystems/do_ui_kit/assets/img/screens/original-1x/screen-1-3-walkthrough.jpg', 'name': 'walkthrough', 'sort': 3, 'key': 3},
      {'url': 'http://invisionapp.com/subsystems/do_ui_kit/assets/img/screens/original-1x/screen-1-4-home.jpg', 'name': 'home', 'sort': 4, 'key': 4},
      {'url': 'http://invisionapp.com/subsystems/do_ui_kit/assets/img/screens/original-1x/screen-1-5-calendar.jpg', 'name': 'calendar', 'sort': 5, 'key': 5},
      {'url': 'http://invisionapp.com/subsystems/do_ui_kit/assets/img/screens/original-1x/screen-1-6-overview.jpg', 'name': 'overview', 'sort': 6, 'key': 6},
      {'url': 'http://invisionapp.com/subsystems/do_ui_kit/assets/img/screens/original-1x/screen-1-7-groups.jpg', 'name': 'groups', 'sort': 7, 'key': 7},
      {'url': 'http://invisionapp.com/subsystems/do_ui_kit/assets/img/screens/original-1x/screen-1-8-list.jpg', 'name': 'list', 'sort': 8, 'key': 8},
      {'url': 'http://invisionapp.com/subsystems/do_ui_kit/assets/img/screens/original-1x/screen-1-9-create.jpg', 'name': 'create', 'sort': 9, 'key': 9},
      {'url': 'http://invisionapp.com/subsystems/do_ui_kit/assets/img/screens/original-1x/screen-1-10-profile.jpg', 'name': 'profile', 'sort': 10, 'key': 10}
    ];
    const displayObject = (<DisplayObject/>), zoom = 0.7;

    //Change the item's sort order
    var onMove = function(source, target){
      source = _.find(sampleItems, {key: parseInt(source, 10)});
      target = _.find(sampleItems, {key: parseInt(target, 10)});

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
//<AbsoluteGrid items={this.state.sampleItems} />
//<PhotoGallery items={this.state.items}/>
AppComponent.defaultProps = {
  items: [
    {
      url: 'http://images.clipartlogo.com/files/ss/original/102/102455216/vector-kremlin-st-basil.jpg',
      caption: 'New York!'
    },
    {
      url: 'http://thumbs.dreamstime.com/x/kremlin-moscow-52830759.jpg',
      caption: 'Cows'
    },
    {
      url: 'http://thumbs.dreamstime.com/z/kremlin-21047190.jpg',
      caption: 'Scooters'
    },
    {
      url: 'http://thumbs.dreamstime.com/z/%D1%81%D0%B8%D0%BC%D0%B2%D0%BE-%D0%BC%D0%BE%D1%81%D0%BA%D0%B2%D1%8B-%D0%BA%D1%80%D0%B5%D0%BC-%D1%8F-40230008.jpg',
      caption: 'Scooters'
    },
    {
      url: 'http://thumbs.dreamstime.com/z/structure-russia-moscow-kremlin-based-three-bears-bears-stand-oil-rigs-oil-pumps-forest-infographic-russian-55309611.jpg',
      caption: 'Scooters'
    }],
  sampleItems: [
    {key: 1, name: 'Test', sort: 0, filtered: 0},
    {key: 2, name: 'Test 1', sort: 1, filtered: 0},
  ]
};

export default AppComponent;
