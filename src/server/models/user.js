import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../../config';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const user = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true },
  hash: String,
  salt: String,
  _brokerId: {type: Schema.Types.ObjectId, ref: 'broker', default: null},
  role: String,
  firstName: String,
  lastName: String,
  accountPending: {type: Boolean, default: true}
});

user.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

user.methods.validPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

user.methods.generateToken = function () {
  let today = new Date();
  let exp = new Date(today);
  exp.setMinutes(today.getMinutes() + 60);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    exp: parseInt(exp.getTime() / 1000),
  }, this.salt);
}

user.statics.fromAuthToken = function (token) {
  var viewer = jwt.decode(token);
  if (!viewer || !viewer._id) {
    return Promise.resolve(null);
  }
  return this.findById(viewer._id)
    .then(function (user) {
      if (jwt.verify(token, user.salt)) {
        return Promise.resolve(viewer);
      }
      return Promise.resolve(null);
    });
};

// Include passport related functionality
user.plugin(passportLocalMongoose);

mongoose.model('user', user);

export default mongoose.model('user');