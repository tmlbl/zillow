var get = require('request').get,
    xml = require('libxmljs');

function Zillow() { }

const ZWSID = 'X1-ZWz1az5tn97taj_4n5nu';

const baseUrl = 'http://www.zillow.com/webservice/' +
  'GetDemographics.htm?zws-id=' + ZWSID + '&state=WA&' +
  'city=Seattle&neighborhood=';

Zillow.prototype.getNeighborhoodGroups = function (hood_name, cb) {
  var fullUrl = baseUrl + hood_name;

  get(fullUrl, function (err, res, xmlString) {
    var doc = xml.parseXmlString(res.body);
    var groups = doc.get('//segmentation').childNodes();

    cb(null, groups.map(function (grp) {
      return {
        title: grp.get('./title').text(),
        name: grp.get('./name').text(),
        description: grp.get('./description').text()
      };
    }));

  });

};

module.exports = new Zillow();
