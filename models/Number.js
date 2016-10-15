var db = require('../db/init').firebase.database();

var numberRef = db.ref('/numbers');

numberRef.once('value',function(numbers){
    console.log('Here are the numbers available:');
    console.log(numbers.val());
});
