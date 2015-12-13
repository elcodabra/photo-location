import dispatcher from '../dispatcher/Dispatcher';

export default class Actions {
    static navigate(newRoute) {
        dispatcher.dispatch('NAVIGATE', { location: newRoute });
    }

    static requestInstaData(lat, lng) {
        dispatcher.dispatch('REQUEST-INSTA-DATA', { lat: lat, lng: lng });
    }

    static requestFlickrData(tag) {
        dispatcher.dispatch('REQUEST-FLICKR-DATA', { tag: tag });
    }

    static processFlickrData(data) {
        dispatcher.dispatch('PROCESS-FLICKR-DATA', data);
    }
}