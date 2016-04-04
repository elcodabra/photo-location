import dispatcher from '../dispatcher/Dispatcher';

export default class Actions {
  static navigate(newRoute) {
    dispatcher.dispatch('NAVIGATE', { location: newRoute });
  }

  static sortGridData(source, target) {
    dispatcher.dispatch('SORT-GRID-DATA',  { source: source, target: target });
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

  static requestInstaGetLocation(foursquare_id) {
    dispatcher.dispatch('REQUEST-INSTA-GET-LOCATION', { foursquare_id: foursquare_id });
  }

  static processInstaGetLocation(data) {
    dispatcher.dispatch('PROCESS-INSTA-GET-LOCATION', data);
  }

  static requestInstaSearch(data) {
    dispatcher.dispatch('REQUEST-INSTA-SEARCH', { lat: data.latitude, lng: data.longitude });
  }

  static processInstaSearch(data) {
    dispatcher.dispatch('PROCESS-INSTA-SEARCH', data);
  }

  static requestFlickrData(tag) {
    dispatcher.dispatch('REQUEST-FLICKR-DATA', { tag: tag });
  }

  static processFlickrData(data) {
    dispatcher.dispatch('PROCESS-FLICKR-DATA', data);
  }

  static request4SquareData(tag) {
    dispatcher.dispatch('REQUEST-4SQUARE-DATA', { tag: tag });
  }

  static process4SquareData(data, isConcat) {
    dispatcher.dispatch('PROCESS-4SQUARE-DATA', { venues: data.response.venues, isConcat: isConcat });
  }

  static requestPlacesData(tag) {
    dispatcher.dispatch('REQUEST-PLACES-DATA', { tag: tag });
  }

  static processPlacesData(data) {
    dispatcher.dispatch('PROCESS-PLACES-DATA', { venues: data.response.GeoObjectCollection.featureMember });
  }

  static requestTagSearch(tag) {
    dispatcher.dispatch('REQUEST-TAG-SEARCH', { tag: tag });
  }

  static processTagSearch(data, isConcat) {
    dispatcher.dispatch('PROCESS-TAG-SEARCH', { venues: data.data, isConcat: isConcat });
  }

  static requestAllVenues(tag) {
    dispatcher.dispatch('REQUEST-ALL-VENUES', { tag: tag });
  }
}
