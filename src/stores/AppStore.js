import Store from '../lib/Store';
import find from 'lodash/collection/find';
import dispatcher from '../dispatcher/Dispatcher';
import Actions from '../actions/Action';
import $ from 'jquery';
import _ from 'lodash';

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
    this.initialize('venues', []);
    this.initialize('search', '');
    this.initialize('instaData', []);
    this.initialize('lastFlickrRequest', 0);
    this.initialize('lastInstaTagRequest', 0);
    this.initialize('currentImage', {});
    this.initialize('lat', 0);
    this.initialize('lng', 0);
    this.initialize('isRefresh', false);
  }

  httpGet(url, isJson) {
    return new Promise(function(resolve, reject) {
      let urlOptions = (!isJson) ? { url: url, jsonp: 'callback', dataType: 'jsonp' } : { url: url, dataType: 'json' };
      $.ajax(urlOptions)
        .done(response => resolve(response))
        .fail(error => reject(error))
    });
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

      case 'SORT-GRID-DATA':
        var screens = this.get('instaData');
        data.source = _.find(screens, {key: parseInt(data.source, 10)});
        data.target = _.find(screens, {key: parseInt(data.target, 10)});

        var targetSort = data.target.sort;

        //CAREFUL, For maximum performance we must maintain the array's order, but change sort
        screens.forEach(function(item){
          //Decrement sorts between positions when target is greater
          if(data.target.sort > data.source.sort && (item.sort <= data.target.sort && item.sort > data.source.sort)){
            item.sort --;
            //Incremenet sorts between positions when source is greator
          }else if(item.sort >= data.target.sort && item.sort < data.source.sort){
            item.sort ++;
          }
        });

        data.source.sort = targetSort;
        this.set('instaData', screens);
        break;

      case 'REQUEST-INSTA-GET-LOCATION':
        $.ajax({
          url: `/proxy-instagram/v1/locations/search?foursquare_v2_id=${data.foursquare_id}`,
          jsonp: 'callback',
          dataType: 'jsonp'
        }).done(response => {
          //Actions.processInstaGetLocation(response);
          Actions.requestInstaSearch(response.data[0]);
        });
        break;

      case 'REQUEST-INSTA-SEARCH':
        $.ajax({
          url: `/proxy-instagram/v1/media/search?lng=${data.lng}&lat=${data.lat}`,
          jsonp: 'callback',
          dataType: 'jsonp'
        }).done(response => {
          Actions.processInstaData(response);
        });
        break;

      case 'PROCESS-INSTA-GET-LOCATION':
        this.set('instaLocation', data.data);
        break;

      case 'REQUEST-INSTA-TAG-DATA':
        let lastInstaRequest = this.get('lastInstaTagRequest');
        let currentInstaTime = Date.now;
        let fiveInstaMinutes = 5 * 60 * 1000;
        if ((currentInstaTime - lastInstaRequest) > fiveInstaMinutes) {
          return;
        }
        $.ajax({
          url: `/proxy-instagram/v1/tags/${data.tag}/media/recent`,
          jsonp: 'callback',
          dataType: 'jsonp'
        }).done(response => {
          Actions.processInstaData(response);
        });
        break;

      case 'PROCESS-INSTA-DATA':
        let newInstaData = _.filter(data.data, { type: 'image' }).map( item => {
          return {
            id: item.id,
            link: item.link,
            low_resolution: item.images.low_resolution,
            standard_resolution: item.images.standard_resolution,
            user_name: item.user.username,
            user_profile_picture: item.user.profile_picture
          }
        } );
        if (this.get("isRefresh") === true) {
          let oldInstaData = this.get('instaData').map( item => { delete item.key; delete item.sort; return item; } );
          newInstaData = _.uniq(newInstaData.concat(oldInstaData),'id');
        }
        this.set('instaData', newInstaData.map((item, index) => _.assign(item, { key: index, sort: index })));
        break;

      case 'REQUEST-4SQUARE-DATA':
        $.ajax({
          url: `/proxy-foursquare/v2/venues/search?near=${data.tag}`,
          jsonp: 'callback',
          dataType: 'jsonp'
        }).done(response => {
          Actions.process4SquareData(response, this.get('search') == data.tag);
        });
        break;

      case 'PROCESS-4SQUARE-DATA':
        var venues = data.venues.map( item => { return { 'name': item.name, 'location': item.location, 'media_count': item.stats.checkinsCount } }).slice(0,3);
        this.set('venues', venues.concat(data.isConcat ? this.get('venues') : []));
        break;

      case 'REQUEST-PLACES-AUTOCOMPLETE':
        $.ajax({
          url: `/proxy-google/maps/api/place/autocomplete/json?input=${data.name}`,
          dataType: 'json'
        }).done(response => {
          Actions.processPlacesAutocomplete(response);
        });
        break;

      case 'PROCESS-PLACES-AUTOCOMPLETE':
        this.set('venues', data.venues.map( item => { return { 'id': item.id, 'name': item.description, 'location_id': item.place_id } } ));
        break;

      case 'REQUEST-PLACES-LOCATION':
        $.ajax({
          url: `/proxy-google/maps/api/geocode/json?place_id=${data.place_id}`,
          dataType: 'json'
        }).done(response => {
          if (response.results[0] && response.results[0].geometry.location) Actions.processPlacesLocation(response.results[0].geometry.location);
        });
        break;

      case 'PROCESS-PLACES-LOCATION':
        Actions.requestInstaSearch(data);
        break;

      case 'REQUEST-TAG-SEARCH':
        $.ajax({
          url: `/proxy-instagram/v1/tags/search?q=${data.tag}`,
          jsonp: 'callback',
          dataType: 'jsonp'
        }).done(response => {
          Actions.processTagSearch(response, this.get('search') == data.tag);
        });
        break;

      case 'PROCESS-TAG-SEARCH':
        var venues = _.forEach( _.sortByOrder(data.venues, 'media_count', 'desc'), (o) => { /*o.name = '#' + o.name*/ }).slice(0,3);
        if ( data.isConcat ) venues.concat(this.get('venues'));
        this.set('venues', venues.concat(data.isConcat ? this.get('venues') : []));
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
