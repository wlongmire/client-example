/*
 *
 * Platform Controller
 *
 */

var service = require('./service');

exports.postUser = function (req, res) {
  service.postUser(req.body)
  .then(function (data) {
    res.json(data);
  })
};

exports.putUser = function (req, res) {
  service.putUser(req.body)
  .then(function (data) {
    res.json(data);
  })
};
