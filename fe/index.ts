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
  Map.example(document.getElementById('content'), ()=> {
    React.render(React.createElement(MapLookUp.MapApp, {className: 'direction-forms'}), document.getElementById('form'), () => {
      setTimeout(()=> {
        // Define the LatLng coordinates for the polygon's path.
        var triangleCoords = [
          new google.maps.LatLng(25.774252, -80.190262),
          new google.maps.LatLng(18.466465, -66.118292),
          new google.maps.LatLng(32.321384, -64.75737),
          new google.maps.LatLng(25.774252, -80.190262)
        ];

        $(document).trigger('map:NewPolygon', [
          [{
            paths: triangleCoords,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            //visible: false,
            fillColor: '#FF0000',
            fillOpacity: 0.35
          }]
        ]);
      }, 5000)

    });
  });
}

//google.maps.event.addDomListener(window, 'load', initialize);
$(document).ready(() => {
  initialize();
});
