'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './Main';
import Modal from './ModalComponent';
import appStore from '../stores/AppStore';

require('styles//DisplayObject.less');

class DisplayObjectComponent extends React.Component {

  handleClick() {
    //( item.view || item.view == 1 ) ? 2 : 1
    appStore.set('instaData', appStore.get('instaData').map(
        item => {
          if (item.id == this.props.item.id) {
            item.view = ( !item.view || item.view == 1 ) ? 2 : 1;
          }
          return item;
        }
    ));
    //this.props.item.view = 2;
    //evt.target.style.backgroundImage = `url('${this.props.item.standard_resolution.url}')`;
    /*
    var render = function(){ ReactDOM.render(<AppComponent />, document.getElementById('app')); };
    var renderDebounced = _.debounce(render, 150);
    renderDebounced();
    */
  }
  render() {
    const itemStyle = {
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundImage: `url('${this.props.item.low_resolution.url}')`
    };
    return (
        <div style={itemStyle} className="gridItem" onClick={this.handleClick.bind(this)}>
          <a href={this.props.item.link} className="name" target="_blank">{this.props.item.user_name}&nbsp;{this.props.item.sort}</a>
          {/*<a href="#image" className="name" onClick={this.handleClick.bind(this)}>{this.props.item.sort}</a>*/}
        </div>
    );
  }
}

DisplayObjectComponent.displayName = 'DisplayObjectComponent';

// Uncomment properties you need
// DisplayObjectComponent.propTypes = {};
// DisplayObjectComponent.defaultProps = {};

export default DisplayObjectComponent;
