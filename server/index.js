
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var cors = require( 'cors' );

var app = express();

app.set('port', (process.env.PORT || 8885));

// app.use(json());
// app.use(morgan('combined'));
app.use(bodyParser.json());

// app.use(cors({
  // origin: 'http://localhost:7777'
// }));

app.use(express.static('dist'));

/**
 * Modules
 */

var modules = [
  // './modules/platform/module.js'
];

for (var i = 0; i < modules.length; i++) {
  require(modules[i])(app);
}

/**
 * Serve
 */

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// :-)
