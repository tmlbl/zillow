var xls = require('xls-to-json');

console.log('Parsing FY data...');
xls({
  input: './test/data/FY2014_50_Final.xls',
  output: './test/data/FY2014_50_Final.json'
}, function (err, data) {
  if (err) throw err;
  console.log('Successfully parsed FY data');
});

// This one throws an exception for some reason
// console.log('Parsing QCT data...');
// xls({
//   input: './test/data/qct_data_seattle.xls',
//   output: './test/data/qct_data_seattle.json'
// }, function (err, data) {
//   console.log('Successfully parsed QCT data');
//   cb();
// });
