/// <reference path="../../typings/tsd.d.ts"/>

import React = require('react');
import TR = require('typed-react');
import _ = require('lodash');
import $ = require('jquery');

import Places = require('./places');
import Icons = require('../misc/icon');
import ToggleList = require('../list/toggle-list');
import mapData = require('./mapDataset');
import TT = require('./tooltips');
import G = require('../globals');

declare var MarkerWithLabel:any;

var gMap:google.maps.Map = null;
var places:Places.MapPlaceRequest = null;

export interface Polygon {
  polygon:google.maps.Polygon;
  id?:string;
}

export interface Marker {
  marker: any;
  id: string;
}

export interface MarkerData {
  id:string;
  position: google.maps.LatLng;
  draggable: boolean;
  raiseOnDrag: boolean;
  icon: string;
  labelContent: string;
  toolTip:string;
  labelAnchor: google.maps.Point;
  labelClass?: string; // the CSS class for the label
}

export interface MapProps {
  mData:MarkerData[];
  mapOptions:google.maps.MapOptions;
  style?:any;
  centerLat?: number;
  centerLng?: number;
}

export interface MapState {
  gMap:google.maps.Map;
  style:any;
}


class ReactMap extends TR.Component<MapProps,MapState> {

  private markers:Marker[] = [];
  private polygons:Polygon[] = [];
  private directionsDisplay = new google.maps.DirectionsRenderer();
  private places:Places.MapPlaceRequest = null;
  private centerLat:number = null;
  private centerLng:number = null;

  static defaultStyle = {
    height: window.innerHeight,
    width: window.innerWidth
  };

  displayDirections(e:JQueryEventObject, dir:google.maps.DirectionsResult) {
    this.directionsDisplay.setDirections(dir);
  }

  private pIdCnt = 0;

  generatePolygon(opts:google.maps.PolygonOptions) {
    var polygon = new google.maps.Polygon(opts);
    polygon.setMap(this.state.gMap);
    this.polygons.push({
      polygon: polygon,
      id: 'polygon-' + this.pIdCnt++
    });
  }

  feedPolygonData(ev:any, polygons:google.maps.PolygonOptions[]) {
    polygons.forEach((p:google.maps.PolygonOptions) => {
      this.generatePolygon(p);
    })
  }

  checkPointInPolys(latLng:google.maps.LatLng) {
    return this.polygons.map((p:Polygon) => {
      return google.maps.geometry.poly.containsLocation(latLng, p.polygon);
    })
  }

  generateMarker(m:MarkerData) {
    m.labelContent = this.checkPointInPolys(m.position)[0] ? G.greenHouse : G.blueHouse;
    var mark = new MarkerWithLabel(m);
    TT.generateMapToolTip(mark, m.toolTip);
    mark.setMap(this.state.gMap);
    this.markers.push({
      marker: mark,
      id: m.id
    });
  }

  clearMarkers() {
    while (this.markers.length > 0) {
      this.markers.pop().marker.setMap(null);
    }
  }

  feedMarkerData(ev:any, markers:any) {
    var self = this;
    this.clearMarkers();
    markers.forEach(function (marker) {
      self.generateMarker(marker);
    });
  }

  mapCenterLatLng() {
    var center = this.props.mapOptions.center;
    return new google.maps.LatLng(center.lat(), center.lng());
  }

  getInitialState() {
    var center = this.props.mapOptions.center;

    this.centerLat = center.lat();
    this.centerLng = center.lng();

    return {
      gMap: null,
      style: this.props.style ? this.props.style : ReactMap.defaultStyle
    }
  }

  componentDidMount() {
    var mapOptions = this.props.mapOptions;
    mapOptions['center'] = this.mapCenterLatLng();

    $(document).on('map:NewDirections', this.displayDirections);
    $(document).on('markerData', this.feedMarkerData);
    $(document).on('map:NewPolygon', this.feedPolygonData);

    setTimeout(()=> {
      window['gMap'] = gMap = new google.maps.Map(this.getDOMNode(), mapOptions);
      this.directionsDisplay.setMap(gMap);
      places = new Places.MapPlaceRequest(gMap);

      this.setState({
        gMap: gMap,
        style: this.state.style
      });
    }, 10);
  }

  componentWillUnmount() {
    $(document).off('map:NewDirections');
    $(document).off('markerData');
    $(document).off('map:NewPolygon');
    $(document).off('map:IsPointInPoly');
  }

  render() {

    if (this.state.gMap != null && this.markers.length == 0) {
      _.each(this.props.mData, this.generateMarker);
    }

    return React.createElement("div", {className: "map", style: this.state.style});
  }

}

export var Map = TR.createClass(ReactMap);

var placeToMarker = (p:google.maps.places.PlaceResult[]):MarkerData[] => {
  return p.map((place, i) => {
    console.log(place);
    return {
      position: place.geometry.location,
      id: 'place-' + i,
      draggable: false,
      raiseOnDrag: false,
      icon: ' ',
      toolTip: '<p>' + place.name + '</p><p>' + (place.formatted_phone_number ? place.formatted_phone_number : '') + '</p>',
      labelContent: G.blueHouse,
      labelAnchor: new google.maps.Point(10, 10),
      labelClass: 'marker'
    }
  })
};

export var example = (el:HTMLElement, cb?:() => void) => {
  var exampleButtons:Icons.IconProps[] = [
    {
      id: 'Multi Family',
      tooltip: 'Multi Family',
      src: 'h-square',
      onClick: (e)=> {
        $('.active-map-markers').removeClass('active-map-markers');
        $(e.currentTarget).addClass('active-map-markers');
        console.log('Loading multi-family home data...');
        mapData.mapMultiFam();
      }
    },
    {
      id: 'Public Housing',
      tooltip: 'Public Housing',
      src: 'home',
      onClick: (e) => {
        $('.active-map-markers').removeClass('active-map-markers');
        $(e.currentTarget).addClass('active-map-markers');
        console.log('Loading public housing data...');
        mapData.mapPublicHousing();
      }
    },
    {
      id: 'Housing Counseling',
      tooltip: 'Housing Counseling',
      src: 'users',
      onClick: (e) => {
        $('.active-map-markers').removeClass('active-map-markers');
        $(e.currentTarget).addClass('active-map-markers');
        console.log('Loading housing counseling data...');
        mapData.mapHousingCounseling();
      }
    },
    {
      id: 'Schools',
      tooltip: 'School',
      src: 'university',
      onClick: (e) => {
        $('.active-map-markers').removeClass('active-map-markers');
        $(e.currentTarget).addClass('active-map-markers');
        places.getNearByPlaces({
          location: gMap.getCenter(),
          radius: 6000,
          types: ['school']
        }, (res:google.maps.places.PlaceResult[], status:google.maps.places.PlacesServiceStatus) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            $(document).trigger('markerData', [placeToMarker(res)]);
          }

        });
        console.log('school');
      }
    },
    {
      id: 'Grocery Stores',
      tooltip: 'Grocery Store',
      src: 'shopping-cart',
      onClick: (e)=> {
        $('.active-map-markers').removeClass('active-map-markers');
        $(e.currentTarget).addClass('active-map-markers');
        places.getNearByPlaces({
          location: gMap.getCenter(),
          radius: 6000,
          types: ['grocery_or_supermarket']
        }, (res:google.maps.places.PlaceResult[], status:google.maps.places.PlacesServiceStatus) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            $(document).trigger('markerData', [placeToMarker(res)]);
          }
        })
      }
    }
  ];
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(47.564757, -122.290830),
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: false
  };
  var mData:MarkerData = {
    position: new google.maps.LatLng(47.6097, -122.3331),
    id: 'marker-1',
    draggable: false,
    raiseOnDrag: false,
    icon: ' ',
    toolTip: 'herp derp',
    labelContent: '<object style="width:20px; height:20px;" type="image/svg+xml"' +
    'data="images/zillow-logo-mask.svg">, class="tooltip" title="' + 'herpderp' + '"></object>',
    labelAnchor: new google.maps.Point(10, 10),
    labelClass: 'marker'
  };
  React.render(
    React.createElement('div', {className: ''},
      React.createElement(Map, {
        mData: [mData],
        mapOptions: mapOptions
      }), React.createElement(ToggleList.ToggleList, {
        listItemProps: exampleButtons,
        className: 'map-filter-list'
      })
    ), el, cb);
};
