import Store from '../lib/Store';
import find from 'lodash/collection/find';
import dispatcher from '../dispatcher/Dispatcher';
import Actions from '../actions/Action';
import $ from 'jquery';
import * as _ from 'lodash';

class AppStore extends Store {

    constructor() {
        super('AppStore');
        this.logger.debug('Initializing AppStore');

        this.initialize('pages', [
            { name: 'welcome', title: 'Welcome', nav: true, auth: false, default: true },
            { name: 'flickr', title: 'Flickr', nav: true, auth: false },
            { name: 'spells', title: 'Spells', nav: true, auth: true }
        ]);
        this.initialize('route', this.getNavigationRoute(window.location.hash.substr(1)));
        this.initialize('images', []);
        this.initialize('instaData', []);
        this.initialize('lastFlickrRequest', 0);
        this.initialize('lastInstaTagRequest', 0);
    }

    onAction(actionType, data) {
        this.logger.debug(`Received Action ${actionType} with data`, data);
        switch (actionType) {

            case 'NAVIGATE':
                let newRoute = this.getNavigationRoute(data.location);
                if (newRoute !== this.get('route')) {
                    this.set('route', newRoute);
                    window.location.hash = `#${newRoute}`;
                }
                break;

            case 'REQUEST-FLICKR-DATA':
                let lastRequest = this.get('lastFlickrRequest');
                let currentTime = Date.now;
                let fiveMinutes = 5 * 60 * 1000;
                if ((currentTime - lastRequest) > fiveMinutes) {
                    return;
                }
                $.ajax({
                    url: 'http://api.flickr.com/services/feeds/photos_public.gne',
                    data: { tags: data.tag, tagmode: 'any', format: 'json' },
                    dataType: 'jsonp',
                    jsonp: 'jsoncallback'
                }).done(response => {
                    Actions.processFlickrData(response);
                });
                break;

            case 'PROCESS-FLICKR-DATA':
                this.set('images', data.items);
                break;

            case 'REQUEST-INSTA-TAG-DATA':
                let lastInstaRequest = this.get('lastInstaTagRequest');
                let currentInstaTime = Date.now;
                let fiveInstaMinutes = 5 * 60 * 1000;
                if ((currentInstaTime - lastInstaRequest) > fiveInstaMinutes) {
                    return;
                }
                $.ajax({
                    //url: "https://api.instagram.com/v1/media/search?lat=48.858093&lng=2.294694&client_id=e050a30d1667451cbc3598f3cce20530",
                    url: "https://api.instagram.com/v1/tags/" + data.tag + "/media/recent?client_id=e050a30d1667451cbc3598f3cce20530",
                    jsonp: "callback",
                    dataType: "jsonp"
                }).done(response => {
                    Actions.processInstaData(response);
                });
                break;

            case 'PROCESS-INSTA-DATA':
                this.set('instaData', _.pluck(_.filter(data.data, { type: 'image' }), 'images'));
                break;

            default:
                this.logger.debug('Unknown actionType for this store - ignoring');
                break;
        }
    }

    getNavigationRoute(route) {
        let newRoute = find(this.get('pages'), path => { return path.name === route.toLowerCase(); });
        if (!newRoute) {
            newRoute = find(this.get('pages'), path => { return path.default && path.default === true; });
        }
        return newRoute.name || '';
    }
}

var appStore = new AppStore();
dispatcher.registerStore(appStore);

export default appStore;