import passport from 'passport';
import LocalStrategy from 'passport-local';
import {userService, emailService} from '../../services';
import {User, Broker, Submission} from '../../models';
import {passport as passportLocal} from '../../utils';

function login(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (user) {
      // if (user.isAdmin){
      //   return res.json({ userId: user._id, token: user.generateAdminToken() })
      // }
      if (user.accountPending) {
        return res.status(400).json({message: `Your account has not been verified. Please contact your administrator.`})
      }

      return res.json({
        token: user.generateToken(),
        user: {
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          _brokerId: user._brokerId,
          accountPending: user.accountPending
        }
      });
    }
    return res.status(401).json(info);
  })(req, res, next);

  // User.authenticate(req.body.password, function (err, user) {
  //   console.log("Error?");
  //   console.log(err);

  //   return res.status(200).json();
  // });
}

/**
 * Token end-point (HTTP POST only)
 * Returns the following:
 * {
 *   "access_token": "...", // New access token
 *   "expires_in": ""
 * }
 */
// function token(req, res, next) {
//   // Grant type: 
//   //   - "refresh_token", requires refresh_token parameter, grant_type="refresh_token" parameter
//   //
//   //
//   // 
//   // We exclude "password" grant type, as the login() action handles this for us
//   if (!req.body.refresh_token) {
//     return res.status(401).json({type: "AuthError", message: "Invalid refresh token."});
//   }

//   if (req.body.grant_type === "refresh_token") {
//     // Check the refresh token. Is it still valid?

//     User.refreshToken(req.body.refresh_token)
//     .then((result) => {

//     }).catch((e) => {
//       console.log("token API end-point ERROR");
//       console.log(e);
//     });
//     // Yes, return new Authorization token
//   } else {
//     // Error. Invalid grant type
//     return res.status(401).json({type: "AuthError", message: "Invalid grant type."});
//   }

// }

function listBrokers(req, res, next) {
  // Display a list of Brokers by query
  // @TODO enforce min-char for query execution.
  // @TODO enforce throttle (max API calls per second)
  // @TODO enforce query sanitization!!!!111one

  Broker.find().limit(10).sort('-name').exec(function (err, brokers) {
    return res.status(200).json({
      success: true,
      brokers
    });
  });
}

function listPowerUsers(req, res, next) {
  let brokerId;
  // Display a list of Power Users associated with the provided brokerId parameter.
  // @TODO enforce ACL!
  // @TODO Sanitize user input!
  // @TODO enforce throttle (max API calls per second)
  if (!(req.params.brokerId || req.query.brokerId) ) {
    return res.status(400).json({ message: "Missing brokerId parameter."});
  }

  brokerId = req.params.brokerId || req.query.brokerId;


  User.find({
    _brokerId: brokerId,
    // role: 'poweruser'
  }).sort('-username').exec(function (err, powerUsers) {
    return res.status(200).json({
      success: true,
      powerUsers
    });
  });
}

function listUsers(req, res, next) {
  User.find().sort('-username').exec(function (err, users) {
    return res.status(200).json({
      success: true,
      users
    });
  });
}


function listSubmissions(req, res, next) {

  if (!req.headers['x-token']) {
    return res.status(401).json('Authorization token required');

  }

  // Display a list of submissions associated with power user
  // passport.use(new LocalStrategy(User.authenticate()));
  // passport.serializeUser(User.serializeUser());
  // passport.deserializeUser(User.deserializeUser());

  User.fromAuthToken(req.headers['x-token']).then((result) => {
    // Assert 'poweruser' or 'admin' role.
    if (!result || !result.user) {
      return res.status(403).json({ type: "AuthError", message: "Access forbidden. Invalid user token." });
    }

    
    // Ok!
    let count = 0;
    let logical = {
      $or: [{submittedBy: result.user._id}, {broker: result.user._brokerId}]
    };

    // Assert allowed roles
    if ( userService.assertRole(result.user, ['admin', 'poweruser', 'user']) ) {
      // If it's only a regular user, show only their submissions.
      if (userService.assertRole(result.user, ['user'])) {
        logical = {
          submittedBy: result.user._id
        };
      }

      Submission.count(logical, function (err, c) {
        // console.log(err);
        // console.log("Got %d", c);
        count = parseInt(c) || 1;
        
        let pageCount = Math.ceil(count / parseInt(req.params.pageCountPerPage) || 1);
        
        Submission.find(logical).limit(10).sort('-createdAt').exec(function (err, submissions) {
          return res.status(200).json({
            success: true,
            pageCount: pageCount,
            submissions: submissions,
            authToken: result.authToken
          });
        });
      });

    } else {
      // Nope.
      return res.status(403).json( {type: "AclInsufficientPermissionError", message: "Access forbidden. Insufficient role permission."} );
    }

  }).catch((e) => {
    // console.log(e);

    if (e.name === 'TokenExpiredError') {
      // Authenticate once again, so as to create a new token.
      return res.status(401).json( {type: e.name, message: "Authorization required. Token Expired"} );
    } else {
      return res.status(500).json( {type: "error", message: e.message });
    }
  });

}

function ping(req, res, next) {

  // if (req.headers['x-token']) {

  // }
  return res.status(200).json({ message: 'OK'});
}

// Allow Admin or Power user to set user account as verified.
function verifyUser(req, res, next) {

  console.log('query: ', req.query);
  console.log('body: ', req.body);
  console.log('params: ', req.params);
  if (!req.query.id) {
    return res.status(400).json({ message: 'Missing ID parameter.' });
  }

  const userId = req.query.id;
  let updatedUser = userService.verifyUser(userId);

  return res.json({success: true});
}

function register(req, res, next) {
  if (!req.body.username) {
    return res.status(400).json({ message: 'Please provide a user name.', field: 'username' });
  }

  if (!req.body.password) {
    return res.status(400).json({ message: 'Please provide a password.', field: 'password' });
  }

  if (!req.body.retypePassword) {
    return res.status(400).json({ message: 'Please re-type the password.', field: 'retypePassword' });
  }

  if (!req.body.firstName) {
    return res.status(400).json({ message: 'Please provide a first name.', field: 'firstName' });
  }

  if (!req.body.lastName) {
    return res.status(400).json({ message: 'Please provide a last name.', field: 'lastName' });
  }

  if (!req.body._brokerId) {
    return res.status(400).json({ message: 'Please select a Broker.'});
  }

  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  /**
   * @TODO Validate and process user registration.
   */

  // Check for existing user - Handled by passport enhanced User model .register()

  // @TODO Assert password length and complexity

  // Register!  
  User.register(
    new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      accountPending: true,
      role: 'user',
      _brokerId: req.body._brokerId
    }),
    req.body.password, 
    function (err, user) {

      if (err) {
        return res.status(400).json({ message: 'Sorry, that user name is not available. Please try something else.'});
      }

      return res.status(200).json({ message: 'Registration complete!'});

    });
}

export default {
  login,
  ping,
  verifyUser,
  register,
  listBrokers,
  listPowerUsers,
  listUsers,
  listSubmissions
}