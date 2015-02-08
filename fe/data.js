var Data = {};

var GovClient = require('data/govclient'),
    _ = require('lodash');

require('data/addLookup');

Data.getProjects = function (cb) {
  new GovClient(GovClient.LIHTC).where('PROJ_CTY=\'Seattle\'', function (err, result) {
    cb(_.map(result.features, function (datum) {
      return {
        name: capitalizeEachWord(datum.properties['PROJECT']),
        number: datum.properties['CO_TEL'],
        allocamt: datum.properties['ALLOCAMT'],
        geometry: datum.geometry
      };
    }));
  });
};

Data.getMultiFamily = function (cb) {
  new GovClient(GovClient.MultiFamily).where('STD_CITY=\'Seattle\'', function (err, res) {
    console.log(res.features[0]);
    cb(_.map(res.features, function (feature) {
      return {
        name: capitalizeEachWord(feature.properties['PROPERTY_NAME_TEXT']),
        desc: feature.properties['PROPERTY_CATEGORY_NAME'],
        groupName: feature.properties['CLIENT_GROUP_NAME'],
        number: feature.properties['PROPERTY_ON_SITE_PHONE_NUMBER'],
        geometry: feature.geometry
      };
    }));
  });
};

Data.getHousingCounseling = function (cb) {
  new GovClient(GovClient.HousingCounseling).where('Agency_Address_City=\'Seattle\'', function (err, res) {
    console.log(res.features[0]);
    cb(_.map(res.features, function (feature) {
      return {
        name: capitalizeEachWord(feature.properties['Agency_Name']),
        phone: feature.properties['Agency_GTR_Phone'],
        email: feature.properties['Agency_GTR_Email'],
        geometry: feature.geometry
      };
    }));
  });
};

Data.getHousingAuthorities = function (cb) {
  new GovClient(GovClient.HousingAuthorities).where('STD_CITY=\'Seattle\'', function (err, res) {
    console.log(res.features[0]);
    cb(_.map(res.features, function (feature) {
      return {
        geometry: feature.geometry
      };
    }));
  });
};

window.Data = Data;

function capitalizeEachWord(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
