/** Platform Module **/

import Component from '../';
import actions from './actions';
import {auth} from '../../utils';

class OwnersEdge extends Component {

  routes (router) {
    router.route('/getRating')
      .post(actions.getRating);

    router.route('/getSubmissions')
      .get(actions.getSubmissions);

    router.route('/getClearance')
      .get(actions.getClearance)

    router.route('/getBroker')
      .get(actions.getBroker);

    router.route('/')
      .get();
    return router;
  }

}

export default new OwnersEdge();
