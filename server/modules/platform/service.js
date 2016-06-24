/*
 *
 * Platform Service
 *
 */

var firebase = require('firebase');
var private = require('./Airflows-Dev-72d85da469f6.json');

firebase.initializeApp({
  serviceAccount: private,
  databaseURL: 'https://airflows-dev.firebaseio.com'
});

// API

module.exports = {
  postUser: postUser,
  putUser: putUser
};

// Functions

function postUser (user) {
  console.log(user);
  return new Promise(function (resolve, reject) {
    var ref = firebase.database().ref();
    var newKey = ref.child('users').push().key;

    var updates = {};

    updates['users/' + newKey] = {
      email: user.email
    }; 

    ref.update(updates)
    .then(function () {
      resolve({
        uid: newKey
      });
    });
  });
}

function putUser (user) {
  console.log(user);
  return new Promise(function (resolve, reject) {
    var ref = firebase.database().ref();

    var updates = {};

    updates['users/' + user.uid] = user; 

    ref.update(updates)
    .then(function () {
      resolve(user);
    });
  });
}
