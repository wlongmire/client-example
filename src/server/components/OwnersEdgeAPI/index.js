/** Platform Module **/

import Component from '../';
import actions from './actions'
import {auth} from '../../'

class OwnersEdge extends Component {

  routes (router) {

    router.route('/getRating')
      .post(actions.getRating)
    router.route('/')
      .get()
    return router;
  }

  componentWillMount () {

  }

  componentDidMount () {

  }
}

export default new OwnersEdge();
