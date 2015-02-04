var app = require('express')(),
    serveStatic = require('serve-static');

/* Configuration */
app.use(serveStatic('www'));

/* Connect to db */
// mongoose.connect('mongodb://localhost/db-name', function (err) {
//   if (err) {
//     throw err;
//   } else {
//     console.log('Connected to MongoDB');
//   }
// });

var zillow = require('./app/zillow');
var neigh = 'Ballard';

zillow.getNeighborhoodGroups(neigh, function (err, groups) {
  console.dir(groups);
});

/* Listen */
var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Listening on port ' + port);
});
