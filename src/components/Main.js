require('normalize.css');
require('styles/App.css');

import React from 'react';
import PhotoGallery from './PhotoGalleryComponent';
import AbsoluteGrid from 'react-absolute-grid/lib/AbsoluteGrid.jsx';

class AppComponent extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {items: props.items, sample: props.sampleItems};
  }
  setItems(items) {
    this.setState({items: items})
  }

  render() {
    return (
      <div className="index">
        <PhotoGallery items={this.state.items}/>
        <AbsoluteGrid items={this.state.sampleItems} />
      </div>
    );
  }
}

AppComponent.defaultProps = {
  items: [
    {
      url: 'http://images.clipartlogo.com/files/ss/original/102/102455216/vector-kremlin-st-basil.jpg',
      caption: 'New York!'
    },
    {
      url: 'http://thumbs.dreamstime.com/x/kremlin-moscow-52830759.jpg',
      caption: 'Cows'
    },
    {
      url: 'http://thumbs.dreamstime.com/z/kremlin-21047190.jpg',
      caption: 'Scooters'
    },
    {
      url: 'http://thumbs.dreamstime.com/z/%D1%81%D0%B8%D0%BC%D0%B2%D0%BE-%D0%BC%D0%BE%D1%81%D0%BA%D0%B2%D1%8B-%D0%BA%D1%80%D0%B5%D0%BC-%D1%8F-40230008.jpg',
      caption: 'Scooters'
    },
    {
      url: 'http://thumbs.dreamstime.com/z/structure-russia-moscow-kremlin-based-three-bears-bears-stand-oil-rigs-oil-pumps-forest-infographic-russian-55309611.jpg',
      caption: 'Scooters'
    }],
  sampleItems: [
    {key: 1, name: 'Test', sort: 0, filtered: 0},
    {key: 2, name: 'Test 1', sort: 1, filtered: 0},
  ]
};

export default AppComponent;
