import passport from 'passport';
import {userService, emailService} from '../../services';
import {User, Broker} from '../../models';
import {passport as passportLocal} from '../../utils';

function login(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (user) {
      if (user.isAdmin){
        return res.json({ userId: user._id, token: user.generateAdminToken() })
      }
      if (user.accountPending) {
        return res.status(400).json({message: `Your account has not been verified. Please contact your administrator.`})
      }
      return res.json({ userId: user._id, token: user.generateJWT() });
    }
    return res.status(401).json(info);
  })(req, res, next);
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

async function register(req, res) {
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

  if (!req.body.lastName) {
    return res.status(400).json({ message: 'Please provide a last name.', field: 'lastName' });
  }  

  //const user = req.body.user;

  //user.isAdmin = false;
  //user.accountPending = true;

  /**
   * @TODO Validate and process user registration.
   */

  // Check for existing user!

  // Assert password length and complexity

  // Register!
  models.User.register(
    new models.User({
      username: req.body.username
    }, req.body.password), 
    function (err, user) {
      if (err) {
        return res.status(400).json({ message: 'Sorry, that user name is not available. Please try something else.'});
      }

      passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (user) {
          if (user.isAdmin){
            return res.json({ userId: user._id, token: user.generateAdminToken() })
          }
          if (user.accountPending) {
            return res.status(400).json({message: `Your account has not been verified. Please contact your administrator.`})
          }
          return res.json({ userId: user._id, token: user.generateJWT() });
        }
        return res.status(401).json(info);
      })(req, res, next);
    });

  // Notify Power User of new user.

  // E-Mail new user.


}

export default {
  login,
  ping,
  verifyUser,
  register
}