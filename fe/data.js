var Data = {};

var GovClient = require('data/govclient'),
    _ = require('lodash');

Data.getProjects = function (cb) {
  new GovClient(GovClient.LIHTC).where('PROJ_CTY=\'Seattle\'', function (err, result) {
    cb(_.map(result.features, function (datum) {
      return {
        name: datum.properties['PROJECT'],
        number: datum.properties['CO_TEL'],
        geometry: datum.geometry
      };
    }));
  });
};

Data.getMultiFamily = function (cb) {
  new GovClient(GovClient.MultiFamily).where('STD_CITY=\'Seattle\'', function (err, res) {
    cb(_.map(res.features, function (feature) {
      return {
        name: feature.properties['PROPERTY_NAME_TEXT'],
        desc: feature.properties['PROPERTY_CATEGORY_NAME'],
        number: feature.properties['PROPERTY_ON_SITE_PHONE_NUMBER'],
        geometry: feature.geometry
      };
    }));
  });
};

window.Data = Data;

Data.getMultiFamily(function (data) {
  console.log('Got multi family data');
  console.log(data);
});
