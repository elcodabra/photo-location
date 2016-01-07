'use strict';

import React from 'react';
import appStore from '../stores/AppStore';

//require('styles//Canvas.less');

class CanvasComponent extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {images_edit: []};
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
      images_edit: appStore.get('images_edit')
    });
  }

  componentDidUpdate() {
    let canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d');

    if ( this.state.images_edit.length === 0 ) {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      let imgs_promises = this.state.images_edit.map( (img, index) => {
        return new Promise( (resolve, reject) => {
          var imgtag = new Image();
          imgtag.src = img.standard_resolution.url;
          imgtag.onload = function() {
            if ( index == 1 ) {
              ctx.globalAlpha = 0.6;
            } else {
              ctx.globalAlpha = 1;
            }
            ctx.drawImage(imgtag, 0, 0, imgtag.width, imgtag.height);
            return resolve();

          }
        });
      });
      Promise.all(imgs_promises).then( () => {
        console.log('Promises All!');
      });
    }
  }



  render() {
    var style = {
      width: this.props.width,
      height: this.props.height
    };
    return (
      <div>
        <canvas id="myCanvas" width={style.width} height={style.height} />
      </div>
    );
  }
}

CanvasComponent.displayName = 'CanvasComponent';

// Uncomment properties you need
// CanvasComponent.propTypes = {};
// CanvasComponent.defaultProps = {};

export default CanvasComponent;
