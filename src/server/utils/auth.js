import {User} from '../models'

function verifyToken(req,res,next) {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(' ')[1];
    return User
      .fromAuthToken(token)
      .then(viewer => {
        if (viewer === null) {
          return res.json({ success: false, message: 'Bad or expired token' });
        } else {
          req.decoded = true;
          req.viewer = viewer;
          next();
        }
      })
      .catch(err => {
        return res.json({ success: false, message: 'Bad or expired token' });
      });
  } else {
    return res.status(403).send({
      success: false,
      message: 'Unauthorized'
    });
  }
}