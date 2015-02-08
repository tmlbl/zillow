/// <reference path="../../typings/tsd.d.ts"/>

import React = require('react');
import TR = require('typed-react');
import $ = require('jquery');

export interface MapAppProps {
  map:google.maps.Map;
}

export interface MapAppStates {
  home:string;
  work:string;
  distance:string;
}

var directionsService = new google.maps.DirectionsService(),
  geocoder = new google.maps.Geocoder();

export var codeAddress = (address:string, cb:(results:any, status:any)=>void) => {
  geocoder.geocode({'address': address}, cb)
};

export var calcRoute = (start:google.maps.LatLng, end:google.maps.LatLng, cb:(results:any, status:any)=>void) => {
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, cb);
};

class App extends TR.Component<MapAppProps,MapAppStates> {

  getInitialState() {
    return {home: '1029 NE 94th ST, Seattle WA 98115', work: '1632 SE 254th ST Covington Wa', distance: ''};
  }

  addressCallBack(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  }

  handleChange(e:Event) {
    var input:any = e.currentTarget,
      home = this.state.home,
      work = this.state.work;

    switch (input.name) {
      case 'home':
        home = input.value;
        break;
      case 'work':
        work = input.value;
        break;
    }

    this.setState({
      home: home,
      work: work,
      distance: this.state.distance
    })
  }

  submit(e:Event) {
    var home:any = document.getElementsByName('home')[0],
      work:any = document.getElementsByName('work')[0],
      me = this;

    var submitCb = (results:any, status:any)=> {
      var homeLatLng:any = null,
        workLatLng:any = null;
      if (status == google.maps.GeocoderStatus.OK) {
        homeLatLng = results;
        console.log(results);
        codeAddress(work.value, (results:any, status:any)=> {
          if (status == google.maps.GeocoderStatus.OK) {
            workLatLng = results;
            calcRoute(homeLatLng[0].geometry.location, workLatLng[0].geometry.location, (results:any, status:any)=> {
              $(document).trigger('map:NewDirections', [results]);
              if (status == google.maps.GeocoderStatus.OK) {
                me.setState({
                  home: this.state.home,
                  work: this.state.work,
                  distance: results.routes[0].legs[0].distance.text
                })
              }
            });
          }
        })
      }
    };
    codeAddress(home.value, submitCb)
  }

  clearAndFocusInput() {
    // Clear the input
    this.setState({
      home: '',
      work: '',
      distance: ''
    }, () => {
    });
  }

  componentDidMount() {
    setTimeout(()=> {
      document.getElementById('home').focus()
    }, 0)
  }

  render() {
    var distance:any = null;
    if (this.state.distance !== '') {
      distance = React.createElement('div', {className: 'distance'}, 'The Distance you entered is: ' + this.state.distance);
    }
    return (
      React.createElement("div", {className: 'form-body'}, [
          React.createElement('div', {className: 'home-input'},
            React.createElement("label", {htmlFor: "home"}, "Home: "),
            React.createElement("input", {
                ref: "home",
                type: 'address',
                id: 'home',
                name: 'home',
                value: this.state.home,
                onChange: this.handleChange
              }
            )
          ),
          React.createElement('div', {className: 'work-input'},
            React.createElement("label", {htmlFor: "work"}, "Work: "),
            React.createElement("input", {
                ref: "work",
                type: 'address',
                id: 'work',
                name: 'work',
                value: this.state.work,
                onChange: this.handleChange
              }
            )
          ),
          React.createElement('button', {onClick: this.submit}, 'Submit'),
          distance
        ]
      )
    );
  }
}

export var MapApp = TR.createClass(App);
