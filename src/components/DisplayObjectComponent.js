'use strict';

import React from 'react';
import Modal from './ModalComponent';
import appStore from '../stores/AppStore';

class DisplayObjectComponent extends React.Component {

  handleClick(evt) {
    appStore.set('currentImage',this.props.item);
    //evt.target.style.backgroundImage = `url('${this.props.item.standard_resolution.url}')`;

  }
  onAddToCanvas(elem) {
    let canvas = document.getElementById('myCanvas'),
        img = document.createElement('img'),
        images_edit =  appStore.get('images_edit'),
        image = _.find(appStore.get('instaData'),{key: parseInt(elem.target.id)});

    if (images_edit.length > 1) images_edit.shift();
    //this.setState({images_edit: appStore.get('images_edit').concat(image)});
    appStore.set('images_edit',images_edit.concat(image));
    /*
    img.setAttribute('crossOrigin', 'anonymous');

    img.src = image.standard_resolution.url;

    img.onload = function () {
      var ctx = canvas.getContext('2d');

      // match size of image
      canvas.width = img.width;
      canvas.height = img.height;
      //ctx.fillStyle="white";
      //ctx.fillRect(0,0,img.width,img.height)

      // Turn transparency on
      ctx.globalAlpha=0.5;
      // Copy the image contents to the canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);

      let new_image = document.createElement('img');
      new_image.src = canvas.toDataURL('image/png');
      canvas.parentElement.appendChild(new_image);
      // Get the data-URI formatted image
      //console.log(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/));
    };

    img.onerror = function () {
      console.log(new Error('FailedToLoadImage'));
    };*/
  }
  onRemove(elem) {
    let instaData = _.reject(appStore.get('instaData'),{key: parseInt(elem.target.id)});
    appStore.set('instaData', instaData);
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
          <div className="remove_div">
            <img id={this.props.item.key} src="https://cdn1.iconfinder.com/data/icons/modern-latin-alphabet-lowercase-and-uppercase-lett/154/keyboard-key-plus-math-function-512.png" className="remove_icon" onClick={this.onAddToCanvas.bind(this)}/>
            <img id={this.props.item.key} src="/images/delete.png" className="remove_icon" onClick={this.onRemove.bind(this)}/>
          </div>
          <a href="#image" className="name" onClick={this.handleClick.bind(this)}>{this.props.item.sort}</a>
          {/*<Modal id={this.props.item.sort} imageURL={this.props.item.standard_resolution.url} />*/}
        </div>
    );
  }
}

DisplayObjectComponent.displayName = 'DisplayObjectComponent';

// Uncomment properties you need
// DisplayObjectComponent.propTypes = {};
// DisplayObjectComponent.defaultProps = {};

export default DisplayObjectComponent;
