'use strict';

import React from 'react';

require('styles//DisplayObject.less');

class DisplayObjectComponent extends React.Component {
  render() {
    const itemStyle = {
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundImage: `url('${this.props.item.url}')`
    };
    return <div style={itemStyle} className="gridItem"><span className="name">{this.props.item.name}</span></div>;
  }
}

DisplayObjectComponent.displayName = 'DisplayObjectComponent';

// Uncomment properties you need
// DisplayObjectComponent.propTypes = {};
// DisplayObjectComponent.defaultProps = {};

export default DisplayObjectComponent;
