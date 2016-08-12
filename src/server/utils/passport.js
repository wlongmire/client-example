import passport from 'passport';
import passportLocal from 'passport-local';
import {User} from '../models'
const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password or username.' });
      }
      return done(null, user);
    });
  }
));
