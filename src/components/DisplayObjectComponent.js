'use strict';

import React from 'react';

require('styles//DisplayObject.less');

class DisplayObjectComponent extends React.Component {

  handleClick(evt) {
    evt.target.style.backgroundImage = `url('${this.props.item.standard_resolution.url}')`;
  }
  render() {
    const itemStyle = {
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundImage: `url('${this.props.item.low_resolution.url}')`
    };
    return <div style={itemStyle} className="gridItem" onClick={this.handleClick.bind(this)}><span className="name">{this.props.item.sort}</span></div>;
  }
}

DisplayObjectComponent.displayName = 'DisplayObjectComponent';

// Uncomment properties you need
// DisplayObjectComponent.propTypes = {};
// DisplayObjectComponent.defaultProps = {};

export default DisplayObjectComponent;
