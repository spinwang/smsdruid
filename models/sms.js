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

var db = firebase.database();
var numberRef = db.ref('/numbers');
numberRef.once('value',function(numbers){
    console.log(numbers.val());
});

var smsRef = db.ref('/msgs');
function logSMS(){
    var sms = this.sms;
    smsRef.push(sms); // this is equivalent to .push(sms).set()
}

/**
 * Represents an SMS object
 * @param {obj} msg - An object with detailed information about the sms received
 * @returns {obj} SMS - An object that represents the received sms
 * @constructor
 */
function SMS(msg){
    return {
        sms    : msg,
        logSMS : logSMS,
    };
}

module.exports = SMS;