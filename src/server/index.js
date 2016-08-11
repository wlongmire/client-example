
/** Dependencies **/

import express from 'express';
import morgan from 'morgan';
import session from 'express-session';

import json from 'express-json';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';

/** Config Node **/

import config from '../config';

global.__root = __dirname + '/';

const port = process.env.PORT || config.server.port;

if (config.env === 'debug') {
  console.log('Config', config);
}

/** Config Express **/

const app = express();

app.use(bodyParser.json());
app.use(session({secret: 'very secret'}));

app.set('name', config.name);

if (config.env === 'debug') {
  app.use(morgan('combined'));
}

if (config.server.cors) {
  app.use(cors(config.server.cors));
}

app.use(json());

app.use(express.static('dist/public'));

/** Components **/
import OwnersEdgeAPI from './components/OwnersEdgeAPI'

// Name and routePrefix are optional

OwnersEdgeAPI.use(app, {
  name: 'OwnersEdgeAPI',
  routePrefix: 'api'
});

/** Serve **/

app.listen(port, function () {
  console.log('███ ███ Express server listening on port %d in %s mode', port, app.get('env'));
});

// :-)
