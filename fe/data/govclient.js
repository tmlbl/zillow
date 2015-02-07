var geojson = require('geojson'),
    req = require('browser-request'),
    qs = require('qs');

// Default base url for querying LIHTC
var defaultUrl = 'http://services.arcgis.com/VTyQ9soqVukalItT/' +
  'arcgis/rest/services/LIHTC/FeatureServer/0/query?';

// Default query parameters
function queryDefaults() {
  return {
    outFields: '*',
    f: 'geojson'
  }
}

function GovClient(url) {
  this.url = url || defaultUrl;
}

GovClient.LIHTC = defaultUrl;
GovClient.AffordabilityIndex = 'http://services' +
  '.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/' +
  'LocationAffordabilityIndexData/FeatureServer/0/query?';
GovClient.MultiFamily = 'http://services.arcgis.com/VTy' +
  'Q9soqVukalItT/arcgis/rest/services/MultiFamilyPropertie' +
  's/FeatureServer/0/query?';

GovClient.prototype.query = function (query, cb) {
  var url = this.url + form(query);
  console.log('Requesting URL', url);
  req.get(url, function (err, result, body) {
    cb(err, JSON.parse(body));
  });
};

GovClient.prototype.where = function (clause, cb) {
  this.query({ where: clause }, cb);
};

GovClient.prototype.near = function (geometry, cb) {
  var lat = geometry.coordinates[0];
  var lon = geometry.coordinates[1];
};

function form(query) {
  var result = queryDefaults();
  Object.keys(query).forEach(function (key) {
    result[key] = query[key];
  });
  return qs.stringify(result);
}

module.exports = GovClient;
