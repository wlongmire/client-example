/*
 *
 * Platform Module
 *
 */

module.exports = function (app) {
  var controller = require('./controller');

  app.get(
    '/platform/test',
    function (req, res) {
      res.json({
        test: true
      });
    }
  );

  app.post(
    '/platform/user',
    controller.postUser
  );

  app.put(
    '/platform/user',
    controller.putUser
  );
};
