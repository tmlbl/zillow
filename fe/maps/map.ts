/// <reference path="../../typings/tsd.d.ts"/>

import React = require('react');
import TR = require('typed-react');
import _ = require('lodash');
import $ = require('jquery');

import Places = require('./places');
import Icons = require('../misc/icon');
import ToggleList = require('../list/toggle-list');

declare var MarkerWithLabel:any;

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
  //map: google.maps.Map;
  labelContent: string;//'<i class="fa fa-send fa-3x" style="color:rgba(153,102,102,0.8);"></i>',
  labelAnchor: google.maps.Point;
  labelClass: string; // the CSS class for the label
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
  private polygons:Polygon[] = [];
  private directionsDisplay = new google.maps.DirectionsRenderer();
  private places:Places.MapPlaceRequest = null;
  private centerLat:number = null;
  private centerLng:number = null;

  static defaultStyle = {
    height: '800px',
    width: '800px'
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
  
  checkPointInPolys(latLng:google.maps.LatLng){
    return this.polygons.map((p:google.maps.Polygon) => {
      return google.maps.geometry.poly.containsLocation(latLng, p);
    })
  }

  generateMarker(m:MarkerData) {
    var mark = new MarkerWithLabel(m).setMap(this.state.gMap);
    this.markers.push({
      marker: mark,
      id: m.id
    });
  }

  feedMarkerData(ev:any, markers:any) {
    var self = this;
    console.log('Called feedMarkerData', markers);
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
    $(document).on('map:NewPolygon', this.feedPolygonData);
    $(document).on('map:IsPointInPoly', this.checkPointInPolys);

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

export var example = (el:HTMLElement, cb?:() => void) => {
  var exampleButtons:Icons.IconProps[] = [
    {
      id: 'hospital',
      src: 'h-square',
      onClick: ()=> {
        console.log('hospital');
      }
    },
    {
      id: 'parks',
      src: 'tree',
      onClick: ()=> {
        console.log('parks');
      }
    },
    {
      id: 'grocery',
      src: 'shopping-cart',
      onClick: ()=> {
        console.log('grocery');
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
