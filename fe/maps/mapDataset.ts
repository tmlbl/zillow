import $ = require('jquery');
import _ = require('lodash');

declare var Data:DataLoader;

interface DataLoader {
    getProjects: (cb: (data: any[]) => any) => void;
    getMultiFamily: (cb: (data: any[]) => any) => void;
    getHousingCounseling: (cb: (data: any[]) => any) => void;
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
                labelContent: '<i class="fa fa-home" style="color:purple;"></i>',
                labelAnchor: new google.maps.Point(0, 0),
                labelClass: 'marker' // the CSS class for the label
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
                labelContent: '<i class="fa fa-home" style="color:purple;"></i>',
                labelAnchor: new google.maps.Point(0, 0),
                labelClass: 'marker' // the CSS class for the label
            };
        });
        $(document).trigger('markerData', [data]);
    });
}
