// Initialize Firebase
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDVAzFNruUePIDKWACy5Acbsok4Cklrx9A",
    authDomain: "smsdruid-590fa.firebaseapp.com",
    databaseURL: "https://smsdruid-590fa.firebaseio.com",
    storageBucket: "smsdruid-590fa.appspot.com",
    serviceAccount : "serviceAccount.json" // this service account has "editor" role

};
firebase.initializeApp(config);

module.exports.firebase = firebase;