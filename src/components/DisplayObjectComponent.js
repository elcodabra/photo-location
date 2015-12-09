'use strict';

import React from 'react';

require('styles//DisplayObject.less');

class DisplayObjectComponent extends React.Component {
  render() {
    const { item, index, itemsLength } = this.props;
    return (
      <div className="displayobject-component">
        Item {index} of {itemsLength}: {item.name}
      </div>
    );
  }
}

DisplayObjectComponent.displayName = 'DisplayObjectComponent';

// Uncomment properties you need
// DisplayObjectComponent.propTypes = {};
// DisplayObjectComponent.defaultProps = {};

export default DisplayObjectComponent;
