/** Dependencies **/
import config from '../config';

import express from 'express';

global.__root = __dirname + '/';

const port = process.env.PORT || 3333;

const app = express();

app.use(bodyParser.json());

app.use(express.static('dist/public'));

app.listen(port, function () {
  console.log('███ ███ Express server listening on port %d in %s mode', port, app.get('env'));
});

export default app;
