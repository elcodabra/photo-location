import React from 'react';
import Actions from '../actions/Action';
import appStore from '../stores/AppStore';

require('styles//Flickr.less');

class Flickr extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            tag: 'russia'
        };

        Actions.requestFlickrData(this.state.tag);
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
            images: appStore.get('images')
        });
    }

    render() {
        let images = this.state.images.map(image => {
            let s = image.media.m.split('/');
            let fn = s[s.length - 1].split('.')[0];
            return (
                <a className="thumbnail"><img src={image.media.m}/></a>
            );
        });

        return (
            <div className="flickr-component">{images}</div>
        );
    }
}

export default Flickr;