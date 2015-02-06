var app = require('express')(),
    serveStatic = require('serve-static');

/* Configuration */
app.use(serveStatic('www'));

/* Listen */
var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Listening on port ' + port);
});
