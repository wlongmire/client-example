
// /** Dependencies **/

// import express from 'express';
// import morgan from 'morgan';
// import session from 'express-session';

// import json from 'express-json';
// import path from 'path';
// import fs from 'fs';
// import cors from 'cors';

// /** Config Node **/

// import config from './config';

// global.__root = __dirname + '/';

// const port = process.env.PORT || config.port;

// if (config.env === 'debug') {
//   console.log('Config', config);
// }

// /** Config Express **/

// const app = express();

// app.use(session({secret: 'very secret'}));

// app.set('name', 'skonkworks');

// if (config.env === 'debug') {
//   app.use(morgan('combined'));
// }

// app.use(cors(config.cors));

// app.use(json());


// /** Components **/

// import platforms from './components/platforms';
// platforms.use(app, config);

// /** Serve **/

// app.listen(port, function () {
//   console.log( 'Express server listening on port %d in %s mode', port, app.get('env'));
// });

// // :-)








import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();

app.set('port', (process.env.PORT || 8999));

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

// var modules = [
  // './modules/platform/module.js'
// ];

// for (var i = 0; i < modules.length; i++) {
//   require(modules[i])(app);
// }

/**
 * Serve
 */

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// :-)
