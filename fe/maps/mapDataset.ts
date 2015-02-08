import $ = require('jquery');
import _ = require('lodash');

declare var Data:DataLoader;

interface DataLoader {
    getProjects: (cb: (data: any[]) => any) => void;
    getMultiFamily: (cb: (data: any[]) => any) => void;
    getHousingCounseling: (cb: (data: any[]) => any) => void;
    getHousingAuthorities: (cb: (data: any[]) => any) => void;
}

export function mapMultiFam() {
    Data.getMultiFamily((data) => {
        data = _.map(data, (datum) => {
            return {
                position: new google.maps.LatLng(
                    datum.geometry['coordinates'][1],
                    datum.geometry['coordinates'][0]
                ),
                id: datum.name,
                draggable: false,
                raiseOnDrag: false,
                icon: ' ',
                toolTip: '<p>' + datum.name + '</p><p>' + (datum['desc'] ? datum['desc'] :'')  +
                    '</p><p>' + (datum.number ? datum.number : '') + '</p>',
                labelContent: '<object style="width:20px; height:20px;" type="image/svg+xml"data="images/zillow-logo-mask.svg"></object>',
                labelAnchor: new google.maps.Point(10, 10),
                labelClass: 'marker'
            };
        });
        $(document).trigger('markerData', [data]);
    });
}

export function mapPublicHousing() {
    Data.getProjects((data) => {
        data = _.map(data, (datum) => {
            return {
                position: new google.maps.LatLng(
                    datum.geometry['coordinates'][1],
                    datum.geometry['coordinates'][0]
                    ),
                id: datum.name,
                draggable: false,
                raiseOnDrag: false,
                icon: ' ',
                toolTip: '<p>' + datum.name + '</p><p>' + (datum.number? datum.number : '') + '</p>',
                labelContent: '<object style="width:20px; height:20px;" type="image/svg+xml"data="images/zillow-logo-mask.svg"></object>',
                labelAnchor: new google.maps.Point(10, 10),
                labelClass: 'marker'
            };
        });
        $(document).trigger('markerData', [data]);
    });
}

export function mapHousingCounseling() {
    Data.getHousingCounseling((data) => {
        data = _.map(data, (datum) => {
            return {
                position: new google.maps.LatLng(
                    datum.geometry['coordinates'][1],
                    datum.geometry['coordinates'][0]
                ),
                id: datum.name,
                draggable: false,
                raiseOnDrag: false,
                icon: ' ',
                toolTip: '<p>' + datum.name + '</p><p>' + (datum.phone ? datum.phone: '') + '</p>',
                labelContent: '<object style="width:20px; height:20px;" type="image/svg+xml"data="images/zillow-logo-mask.svg"></object>',
                labelAnchor: new google.maps.Point(10, 10),
                labelClass: 'marker'
            };
        });
        $(document).trigger('markerData', [data]);
    });
}
