var get = require('request').get,
    xls = require('xls-to-json');

function Gov() { }

const rentDataUrl =
  'http://www.huduser.org/portal/datasets/50thper/FY2014_50_Final.xls'

Gov.prototype.loadRentData = function (cb) {
  console.log('Parsing xls data to JSON...');
  xls({
    input: './test/data/FY2014_50_Final.xls',
    output: './test/data/FY2014_50_Final.json'
  }, function (err, data) {
    if (err) throw err;
    console.log('Successfully parsed to JSON');
    cb();
  });
};

module.exports = new Gov();
