import _ = require('lodash');

export interface CB {
  (results:google.maps.places.PlaceResult[], status:google.maps.places.PlacesServiceStatus):void;
}

export interface PlaceRequest extends google.maps.places.PlaceSearchRequest {
}

export interface TextRequest extends google.maps.places.TextSearchRequest {
}

export class MapPlaceRequest {
  private map:google.maps.Map = null;
  public service:google.maps.places.PlacesService = null;

  constructor(map:google.maps.Map) {
    this.map = map;
    this.service = new google.maps.places.PlacesService(map);
  }

  getNearByPlaces(req:PlaceRequest, cb:CB) {
    this.service.nearbySearch(req, cb);
  }

  getTextSearch(req:TextRequest, cb:CB) {
    this.service.textSearch(req, cb);
  }
}


//service = new google.maps.places.PlacesService(map);
//service.textSearch(request, callback);
//}
//
//function callback(results, status) {
//    if (status == google.maps.places.PlacesServiceStatus.OK) {
//        for (var i = 0; i < results.length; i++) {
//            var place = results[i];
//            createMarker(results[i]);
//        }
//    }
//}
