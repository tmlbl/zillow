/// <reference path="../typings/tsd.d.ts"/>

import React = require('react');
import TR = require('typed-react');

import MapLookUp = require('maps/mapLookUp');
import Map = require('maps/map');
import Places = require('maps/places');
import Loader = require('maps/mapDataset');
import List = require('list/list')
import TL = require('list/toggle-list');

function initialize() {
  Map.example(document.getElementById('content'), ()=>{
    React.render(React.createElement(MapLookUp.MapApp, {className: 'direction-forms'}), document.getElementById('form'));
  });
  Loader.mapProjects();
}

google.maps.event.addDomListener(window, 'load', initialize);