/// <reference path="../../typings/tsd.d.ts"/>

import React = require('react');
import TR = require('typed-react');
import _ = require('lodash');
import $ = require('jquery');

import Places = require('./places');
import Icons = require('../misc/icon');
import ToggleList = require('../list/toggle-list');
import mapData = require('./mapDataset')

declare var MarkerWithLabel:any;

export interface MarkerData {
  id:string;
  position: google.maps.LatLng;
  draggable: boolean;
  raiseOnDrag: boolean;
  icon: string;
  //map: google.maps.Map;
  labelContent: string;//'<i class="fa fa-send fa-3x" style="color:rgba(153,102,102,0.8);"></i>',
  labelAnchor: google.maps.Point;
  labelClass: string; // the CSS class for the label
}

export interface Marker {
  marker: any;
  id: string;
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

export interface MarkerProps {
  data:MarkerData;
  map:google.maps.Map;
}
export interface MarkerState {
  data:MarkerData;
}

class ReactMap extends TR.Component<MapProps,MapState> {

  private markers:Marker[] = [];
  private directionsDisplay = new google.maps.DirectionsRenderer();
  private places:Places.MapPlaceRequest = null;
  private centerLat:number = null;
  private centerLng:number = null;

  static defaultStyle = {
    height: '500px',
    width: '500px'
  };

  displayDirections(e:JQueryEventObject, dir:google.maps.DirectionsResult) {
    this.directionsDisplay.setDirections(dir);
  }

  generateMarker(m:MarkerData) {
      var mark = new MarkerWithLabel(m);
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
    var mapOptions = {
      center: this.mapCenterLatLng(),
      zoom: this.props.mapOptions.zoom
    };

    $(document).on('map:NewDirections', this.displayDirections);
    $(document).on('markerData', this.feedMarkerData);

    setTimeout(()=> {
      var gMap:google.maps.Map = new google.maps.Map(this.getDOMNode(), mapOptions);
      this.directionsDisplay.setMap(gMap);
      this.places = new Places.MapPlaceRequest(gMap);
      this.setState({
        gMap: gMap,
        style: this.state.style
      });
    }, 10);
  }

  componentWillUnmount() {
    $(document).off('map:NewDirections');
    $(document).off('markerData');
  }

  render() {

    if (this.state.gMap != null && this.markers.length == 0) {
      _.each(this.props.mData, this.generateMarker);
    }

    return React.createElement("div", {className: "map", style: this.state.style});
  }

}

export var Map = TR.createClass(ReactMap);

export var example = (el:HTMLElement, cb?:() => void) => {
  var exampleButtons:Icons.IconProps[] = [
    {
      id: 'Multi Family',
      src: 'h-square',
      onClick: ()=> {
        console.log('Loading multi-family home data...');
        mapData.mapMultiFam();
      }
    },
    {
      id: 'Public Housing',
      src: 'home',
      onClick: () => {
        console.log('Loading public housing data...');
        mapData.mapPublicHousing();
      }
    },
    {
      id: 'Housing Counseling',
      src: 'shopping-cart',
      onClick: ()=> {
        console.log('Loading housing counseling data...');
        mapData.mapHousingCounseling();
      }
    },
    {
      id: 'school',
      src: 'university',
      onClick: ()=> {
        console.log('school');
      }
    },
    {
      id: 'transit',
      src: 'bus',
      onClick: ()=> {
        console.log('transit');
      }
    }
  ];
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(47.6097, -122.3331)
  };
  var mData:MarkerData = {
    position: new google.maps.LatLng(47.6097, -122.3331),
    id: 'marker-1',
    draggable: false,
    raiseOnDrag: false,
    icon: ' ',
    labelContent: '<i class="fa fa-send fa-3x" style="color:rgba(153,102,102,0.8);"></i>',
    labelAnchor: new google.maps.Point(0, 0),
    labelClass: 'marker' // the CSS class for the label
  };
  React.render(
    React.createElement('div', {className:''},
      React.createElement(Map, {
        mData: [mData],
        mapOptions: mapOptions
      }), React.createElement(ToggleList.ToggleList, {
        listItemProps: exampleButtons,
        className: 'map-filter-list'
      })
    ), el, cb);
};
