'use strict';

import React from 'react';
import Modal from './ModalComponent';
import appStore from '../stores/AppStore';

require('styles//DisplayObject.less');

class DisplayObjectComponent extends React.Component {

  handleClick(evt) {
    appStore.set('currentImage',this.props.item);
    //evt.target.style.backgroundImage = `url('${this.props.item.standard_resolution.url}')`;

  }
  render() {
    const itemStyle = {
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundImage: `url('${this.props.item.low_resolution.url}')`
    };
    return (
        <div style={itemStyle} className="gridItem">
          <a href="#image" className="name" onClick={this.handleClick.bind(this)}>{this.props.item.sort}</a>
        </div>
    );
  }
}

DisplayObjectComponent.displayName = 'DisplayObjectComponent';

// Uncomment properties you need
// DisplayObjectComponent.propTypes = {};
// DisplayObjectComponent.defaultProps = {};

export default DisplayObjectComponent;
