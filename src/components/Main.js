require('normalize.css');
require('styles/App.css');

import React from 'react';
import PhotoComponent from './PhotoComponent';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <PhotoComponent imageURL='http://images.clipartlogo.com/files/ss/original/102/102455216/vector-kremlin-st-basil.jpg' />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
