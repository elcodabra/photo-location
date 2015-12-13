import dispatcher from '../dispatcher/Dispatcher';

export default class Actions {
    static navigate(newRoute) {
        dispatcher.dispatch('NAVIGATE', { location: newRoute });
    }

    static requestInstaData(lat, lng) {
        dispatcher.dispatch('REQUEST-INSTA-DATA', { lat: lat, lng: lng });
    }

    static requestInstaTagData(tag) {
        dispatcher.dispatch('REQUEST-INSTA-TAG-DATA', { tag: tag });
    }

    static processInstaData(data) {
        dispatcher.dispatch('PROCESS-INSTA-DATA', data);
    }

    static requestFlickrData(tag) {
        dispatcher.dispatch('REQUEST-FLICKR-DATA', { tag: tag });
    }

    static processFlickrData(data) {
        dispatcher.dispatch('PROCESS-FLICKR-DATA', data);
    }
}