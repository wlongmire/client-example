/** Platform Module **/

import Component from '../';
import service from './service'

class Platform extends Component {
  routes (router) {

    // Note that in this example component
    // it is optionally using prefixed routes; see server file

    // Can be tested here:
    // http://localhost:8888/platform/test

    router.get('/test',
      this.handleGetTest
    );

    router.post(
      '/user',
      this.handlePostUser
    );

    router.put(
      '/user',
      this.handlePutUser
    );

    return router;
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

  // Functions included for demo purposes

  componentWillMount () {
    return;
  }

  componentDidMount () {
    return;
  }
}

export default new Platform();
