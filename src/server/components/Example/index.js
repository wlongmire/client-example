/** Platform Module **/

import Component from '../';
import actions from './actions'

class Example extends Component {
  getInitialState () {
    return {
      some: 'setting'
    };
  }

  routes (router) {

    // Note that in this example component
    // it is optionally using prefixed routes; see server file

    // Can be tested here:
    // http://localhost:8888/platform/test

    router.get(
      '/test',
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
    res.json(await actions.postUser());
  }

  async handlePutUser (req, res) {
    res.json(await actions.putUser());
  }

  async handleGetTest (req, res) {
    res.json(await actions.getTest());
  }

  // Functions included for demo purposes

  componentWillMount () {
    this.setState({
      another: 'setting'
    });

    return;
  }

  componentDidMount () {
    console.log(this.state);

    return;
  }
}

export default new Example();
