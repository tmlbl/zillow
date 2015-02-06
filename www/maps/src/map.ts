/// <reference path="../typings/tsd.d.ts"/>

import React = require('react');
import TR = require('typed-react');
import _ = require('lodash');
import $ = require('jquery');

export interface SvgSymbol {
  id: string;
  path: string;
  fillColor: string;
  fillOpacity: number;
  scale: number
  strokeColor: string;
  strokeWeight: number
}

var SYMBOLS =
{
  star: {
    path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    fillColor: 'green',
    fillOpacity: 0.8,
    scale: .1,
    strokeColor: 'gold',
    strokeWeight: 3
  }
};

export interface MarkerData {
  //required
  position: google.maps.LatLng;
  id:string;

  //optional
  animation?: google.maps.Animation;
  clickable?: boolean;
  cursor?: string;
  draggable?: boolean;
  flat?: boolean;
  iconId?:string;//key to our symbols saved here
  icon?: any;
  map?: any;
  optimized?: boolean;
  raiseOnDrag?: boolean;
  shadow?: any;
  shape?: google.maps.MarkerShape;
  title?: string;
  visible?: boolean;
  zIndex?: number;
}

export interface Marker {
  marker: google.maps.Marker;
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
  private centerLat:number;
  private centerLng:number;

  static defaultStyle = {
    height: '500px',
    width: '500px'
  };

  displayDirections (e:JQueryEventObject, dir:google.maps.DirectionsResult){
    this.directionsDisplay.setDirections(dir);
  }

  generateMarker(m:MarkerData) {
    var itExists = _.find(this.markers, (marker:Marker) => {
      return m.id == marker.id;
    });

    if (!itExists) {
      var props:any = m;
      //add it to our map
      props.map = this.state.gMap;
      this.markers.push({
        marker: new google.maps.Marker(props),
        id: m.id
      })
    }
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
    $(document).on('map:NewDirections',this.displayDirections);

    setTimeout(()=> {
      var gMap:google.maps.Map = new google.maps.Map(this.getDOMNode(), mapOptions);
      this.directionsDisplay.setMap(gMap);
      this.setState({
        gMap: gMap,
        style: this.state.style
      });
    }, 10);
  }

  componentWillUnmount(){
    $(document).off('map:NewDirections');
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
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(-25.363882, 131.044922)
  };
  var mData:MarkerData = {
    position: new google.maps.LatLng(-25.363882, 131.044922),
    id: 'marker-1',
    icon: SYMBOLS.star
  };
  React.render(React.createElement(Map, {
    mData: [mData],
    mapOptions: mapOptions
  }), el, cb);
};
