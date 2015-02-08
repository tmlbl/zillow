/// <reference path="../typings/tsd.d.ts"/>

import React = require('react');
import TR = require('typed-react');
import $ = require('jquery');

import MapLookUp = require('maps/mapLookUp');
import Map = require('maps/map');
import Places = require('maps/places');
import List = require('list/list')
import TL = require('list/toggle-list');

function initialize() {
  Map.example(document.getElementById('content'), () => {

  });
}

//google.maps.event.addDomListener(window, 'load', initialize);
$(document).ready(() => {
  initialize();
});

import tips = require('maps/tooltips');

tips.init();
