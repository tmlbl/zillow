/// <reference path="../typings/tsd.d.ts"/>

import React = require('react');
import TR = require('typed-react');
import $ = require('jquery');
import _ = require('lodash');

import MapLookUp = require('maps/mapLookUp');
import Map = require('maps/map');
import Places = require('maps/places');
import List = require('list/list')
import TL = require('list/toggle-list');
import TT = require('maps/tooltips');

function initialize() {
  Map.example(document.getElementById('content'), () => {
    setTimeout(()=> {
      // Define the LatLng coordinates for the polygon's path.
      var triangleCoords = [
        new google.maps.LatLng(47.558105, -122.284539), // Rookies sports bar
        new google.maps.LatLng(47.561175, -122.284089), // Rainier community center
        new google.maps.LatLng(47.579174, -122.299633), // QFC Rainier Ave
        new google.maps.LatLng(47.562967, -122.308345), // VA Puget Sound
        new google.maps.LatLng(47.558105, -122.284539) // Rookies sports bar
      ];

      var coordNames = [
          'Rookie\'s Sports Bar',
          'Rainier Community Center',
          'QFC Rainier Avenue',
          'VA Puget Sound'
      ];

      // Put down markers for the demo locations
      function makeDemoMarker(latLng:google.maps.LatLng, name): Map.MarkerData {
        return {
          position: latLng,
          id: name,
          toolTip: name,
          draggable: false,
          raiseOnDrag: false,
          icon: ' ',
          labelContent: '<object style="width:20px; height:20px;" type="image/svg+xml"' +
          'data="images/zillow-logo-mask.svg">, class="tooltip" title="' + name + '"></object>',
          labelAnchor: new google.maps.Point(10, 10),
          labelClass: 'marker'
        }
      }

      var demoMarkers:Map.MarkerData[] = _.map(coordNames, function (name, index) {
        return makeDemoMarker(triangleCoords[index], name);
      });

      $(document).trigger('markerData', [demoMarkers]);

      $(document).trigger('map:NewPolygon', [
        [{
          paths: triangleCoords,
          strokeColor: '#0064CD',
          strokeOpacity: 0.7,
          strokeWeight: 1,
          fillColor: '#0064CD',
          fillOpacity: 0.35
        }]
      ]);
    }, 5000)

  });
}

//google.maps.event.addDomListener(window, 'load', initialize);
$(document).ready(() => {
  initialize();
});

//tips.init();
