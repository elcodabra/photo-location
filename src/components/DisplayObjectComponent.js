'use strict';

import React from 'react';
import Modal from './ModalComponent';
import appStore from '../stores/AppStore';

class DisplayObjectComponent extends React.Component {

  handleClick(evt) {
    appStore.set('currentImage',this.props.item);
    //evt.target.style.backgroundImage = `url('${this.props.item.standard_resolution.url}')`;

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
