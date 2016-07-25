/** Platform Module **/

import Component from '../';
import service from './service'

class Platform extends Component {
  routes (app) {
    app.get('/platform/test',
      this.handleGetTest
    );

    app.post(
      '/platform/user',
      this.handlePostUser
    );

    app.put(
      '/platform/user',
      this.handlePutUser
    );
  }

  async handlePostUser (req, res) {
    res.json(await service.postUser());
  }

  async handlePutUser (req, res) {
    res.json(await service.putUser());
  }

  async handleGetTest (req, res) {
    res.json(await service.getTest());
  }

  componentDidMount (app) {
    console.log('Platform: component mounted');
  }
}

export default new Platform();
