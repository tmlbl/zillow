var app = require('express')(),
    serveStatic = require('serve-static');

/* Configuration */
app.use(serveStatic('www/zillow-proto'));

/* Listen */
var port = process.env.PORT || 80;
app.listen(port, function () {
  console.log('Listening on port ' + port);
});
