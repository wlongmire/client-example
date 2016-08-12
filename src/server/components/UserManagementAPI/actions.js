import passport from 'passport';
import {userSvc} from '../services';
import {passport as passportLocal} from '../..utils'

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

async function verifyUser(req, res) {
  const userId = req.params.id;
  let updatedUser = await userSvc.verifyUser(userId);
  return res.json({success: true, user: updatedUser});
}

async function register(req, res) {

}

export default {
  login,
  verifyUser
}