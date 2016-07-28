/** Platform Service **/

import firebase from 'firebase';

// Download this file from Firebase; create service account
// const privateFile = require('./Airflows-Dev-72d85da469f6.json');

// firebase.initializeApp({
//   serviceAccount: privateFile,
//   databaseURL: 'https://airflows-dev.firebaseio.com'
// });


/* Hoisted Functions */

exports.getTest = async function getTest () {
  return new Promise(function (resolve, reject) {
    resolve({
      name: 'Example Component',
      test: true
    });
  });
}

exports.postUser = async function postUser (user) {
  return new Promise(function (resolve, reject) {
    // let ref = firebase.database().ref();
    // let newKey = ref.child('users').push().key;

    // let newUser = {
    //   email: user.email,
    //   uid: newKey
    // };

    // let updates = {};
    // updates['users/' + newKey] = newUser; 

    // ref.update(updates)
    // .then(function () {
    //   resolve(newUser);
    // });
  });
}

exports.putUser = async function putUser (user) {
  return new Promise(function (resolve, reject) {
    // let ref = firebase.database().ref();

    // let updates = {};

    // updates['users/' + user.uid] = user; 

    // ref.update(updates)
    // .then(function () {
    //   resolve(user);
    // });
  });
}
