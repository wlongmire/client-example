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
    router.route('/getEdgeSubmissions')
      .post(actions.getEdgeSubmissions);
    router.route('/getBroker')
      .get(actions.getBroker);
    router.route('/')
      .get();
    return router;
  }

}

export default new OwnersEdge();
