/// <reference path="../typings/tsd.d.ts"/>

import React = require('react');
import TR = require('typed-react');

import MapLookUp = require('maps/mapLookUp');
import Map = require('maps/map');

function initialize() {
  Map.example(document.getElementById('content'), ()=>{
    React.render(React.createElement(MapLookUp.MapApp, {className: 'direction-forms'}), document.getElementById('form'));
  });

}

google.maps.event.addDomListener(window, 'load', initialize);