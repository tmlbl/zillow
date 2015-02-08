//import Tip = require('component-tip');
import _ = require('lodash');
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
function makeTooltips() {
    var els = document.querySelectorAll('[data-tooltip]');
    console.log('Processing', els.length, 'tooltips');
    _.each(els, function (el:HTMLElement) {
        el.onmouseenter = () => {
            console.log('entered', el.dataset['tooltip']);
            var elRect = el.getBoundingClientRect();
            var tt = document.createElement('div');
            tt.style.position = 'fixed';
            tt.style.bottom = elRect.top + 'px';
            tt.style.left = elRect.right + 'px';
            tt.innerHTML = el.dataset['tooltip'];
            tt.style['z-index'] = 10;
            tt.style['background-color'] = 'black';
            tt.style.color = 'white';
            document.body.appendChild(tt);
        };
        el.onmouseleave = () => {
            console.log('leaving', el.dataset['tooltip']);
        };
    });
}

export function init() {
    console.log('Initializing tooltips...');
    setInterval(makeTooltips, tipInterval);
}