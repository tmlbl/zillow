//import _ = require('lodash');

declare var InfoBox:any;

var tipInterval:number = 2500;

/**
 * The easiest way to attach tooltips to individual tooltips is to add
 * data- attributes to the tag itself. This is easy to do in React.
 * However, since React creates and destroys elements all the time, we
 * need a way to read these attributes and attach our tooltips
 * continuously. This solution polls the DOM on an interval to find
 * elements with tooltip attributes, creates tooltips for them, and
 * manages their behavior.
 *
 * To attach a tooltip to an element, add a data-tooltip="" attribute.
 * The value will be the content of the tooltip. You may override the
 * default position with a data-tooltip-position attribute.
 */
//function makeTooltips() {
//    var els = document.querySelectorAll('[data-tooltip]');
//    console.log('Processing', els.length, 'tooltips');
//    _.each(els, function (el:HTMLElement) {
//        el.onmouseenter = () => {
//            console.log('entered', el.dataset['tooltip']);
//            var elRect = el.getBoundingClientRect();
//            var tt = document.createElement('div');
//            tt.style.position = 'fixed';
//            tt.style.bottom = elRect.top + 'px';
//            tt.style.left = elRect.right + 'px';
//            tt.innerHTML = el.dataset['tooltip'];
//            tt.style['z-index'] = 10;
//            tt.style['background-color'] = 'black';
//            tt.style.color = 'white';
//            document.body.appendChild(tt);
//        };
//        el.onmouseleave = () => {
//            console.log('leaving', el.dataset['tooltip']);
//        };
//    });
//}

//export function init() {
//    console.log('Initializing tooltips...');
//    setInterval(makeTooltips, tipInterval);
//}

var AllToolTips:any[] = [];

export var generateMapToolTip = (marker:any, text:any) => {
  var boxText = document.createElement("div");
  boxText.style.cssText = "border-radius:2px; margin-top: 8px; background: #0064CD; padding: 5px; color: white;";
  boxText.innerHTML = text;
  
  var myOptions = {
    content: boxText //to be replaced by htmlElement
    ,disableAutoPan: false
    ,maxWidth: 0
    //,pixelOffset: new google.maps.Size(-140, 0)
    ,zIndex: null
    ,boxStyle: {
      opacity: 0.95
      ,maxWidth: "200px"
    }
    ,closeBoxURL:""
    ,infoBoxClearance: new google.maps.Size(1, 1)
    ,isHidden: false
    ,pane: "floatPane"
    ,enableEventPropagation: false
  };
  
  var tooltip = new InfoBox(myOptions);
  AllToolTips.push(tooltip);
  
  google.maps.event.addListener(marker, "mouseover", function (e) {
    AllToolTips.forEach( (t:any) => {
      t.close(window['gMap'],this)
    });
    tooltip.open(window['gMap'], this);
  });
  google.maps.event.addListener(marker, "mouseout", function (e) {
    tooltip.close(window['gMap'], this);
  });
};
