var geojson = require('geojson'),
    req = require('request'),
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
};

function GovClient(url) {
  this.url = url || defaultUrl;
}

GovClient.LIHTC = defaultUrl;

GovClient.prototype.query = function (query, cb) {
  var url = this.url + form(query);
  console.log('Requesting URL', url);
  req.get(url, function (err, result, body) {
    cb(err, body);
  });
};

GovClient.prototype.where = function (clause, cb) {
  this.query({ where: clause }, cb);
};

function form(query) {
  var result = queryDefaults();
  Object.keys(query).forEach(function (key) {
    result[key] = query[key];
  });
  return qs.stringify(result);
}

new GovClient().where('PROJ_CTY=\'Seattle\'', function (err, body) {
  console.dir(body);
});

module.exports = GovClient;
