import passport from 'passport';
import LocalStrategy from 'passport-local';
import {userService, emailService} from '../../services';
import {User, Broker} from '../../models';
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

function ping(req, res, next) {
  return res.status(200).json({ message: 'OK'});
}

// Allow Admin or Power user to set user account as verified.
async function verifyUser(req, res, next) {

  if (!req.params.id) {
    return res.status(400).json({ message: 'Missing ID parameter.' });
  }

  const userId = req.params.id;
  let updatedUser = await userService.verifyUser(userId);

  return res.json({success: true, user: updatedUser});
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

  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  /**
   * @TODO Validate and process user registration.
   */

  // Check for existing user!

  // Assert password length and complexity

  // Register!  
  User.register(
    new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      accountPending: true,
      role: 'user'
    }),
    req.body.password, 
    function (err, user) {

      if (err) {
        return res.status(400).json({ message: 'Sorry, that user name is not available. Please try something else.'});
      }

      return res.status(200).json({ message: 'Registartion complete!'});

    });
}

export default {
  login,
  ping,
  verifyUser,
  register
}