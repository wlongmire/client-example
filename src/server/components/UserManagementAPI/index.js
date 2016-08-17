/** Platform Module **/

import Component from '../';
import actions from './actions'
import {auth} from '../../utils';

class UserManagement extends Component {

  routes (router) {

    router.route('/login')
      .post(actions.login)
    router.route('/ping')
      .get(actions.ping)
    router.route('/verifyUser')
      .post(actions.verifyUser)
    // router.route('/register')
    //   .post(actions.register)
    router.route('/')
      .get()
    return router;
  }

  componentWillMount () {

  }

  componentDidMount () {

  }
}

export default new UserManagement();
