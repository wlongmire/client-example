/** Platform Module **/

import Component from '../';
import actions from './actions'

class OwnersEdge extends Component {

  routes (router) {

    router.route('/getRating')
      .post(actions.getRating)
    return router;
  }

  componentWillMount () {

  }

  componentDidMount () {

  }
}

export default new OwnersEdge();
