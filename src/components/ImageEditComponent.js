'use strict';

import React from 'react';
import appStore from '../stores/AppStore';

require('styles//ImageEdit.less');

class ImageEditComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dragX: 0,
      dragY: 0
    };
  }

  onDrag(e) {
    this.setState({
      dragX: e.clientX,
      dragY: e.clientY
    });
  }

  getStyle(x, y){
    var dragStyle = {};
    dragStyle.left = x;
    dragStyle.top = y;

    return dragStyle;
  }

  render() {
    let style = this.props.images.length > 0 ? { backgroundImage: `url('${this.props.images[0].standard_resolution.url}')` } : { backgroundColor: 'white' } ;
    let img_src = this.props.images.length > 1 ? (
      <div className='resize-container' onDrag={this.onDrag.bind(this)} style={this.getStyle(this.state.dragX, this.state.dragY)} >
        <span className="resize-handle resize-handle-nw"></span>
        <span className="resize-handle resize-handle-ne"></span>
        <img className="resize-image" src={this.props.images[1].standard_resolution.url} draggable="true" alt="image for resizing" />
        <span className="resize-handle resize-handle-sw"></span>
        <span className="resize-handle resize-handle-se"></span>
      </div>
      ) : null ;
    return (
      <div className='image-edit-component'>
        <div className='component' style={style}>
          {img_src}
        </div>
      </div>
    );
  }
}

ImageEditComponent.displayName = 'ImageEditComponent';

// Uncomment properties you need
// ImageEditComponent.propTypes = {};
// ImageEditComponent.defaultProps = {};

export default ImageEditComponent;
