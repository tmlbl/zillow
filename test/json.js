var zillow = require('../app/zillow');
var neigh = 'Ballard';

zillow.getNeighborhoodGroups(neigh, function (err, groups) {
  console.dir(groups);
});
