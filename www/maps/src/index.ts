/// <reference path="../typings/tsd.d.ts"/>

import React = require('react');
import TR = require('typed-react');

import Map = require('./mapLookUp');

var directionsService;
var geocoder;
var map;

function initialize() {
  directionsService = new google.maps.DirectionsService();
  geocoder = new google.maps.Geocoder();

  React.render(React.createElement(Map.MapApp, {className: 'direction-forms'}), document.body);
}

google.maps.event.addDomListener(window, 'load', initialize);