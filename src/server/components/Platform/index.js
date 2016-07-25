/** Platform Module **/

import Component from '../';
import service from './service'

class Platform extends Component {
  routes (router) {
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
