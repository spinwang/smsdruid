'use strict';

angular.module('myApp.view1', ['ngRoute','btford.socket-io'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs :'ctrl',
    resolve: {
      factory : 'mySocket'
    }
  });
}])
.factory('mySocket', ['socketFactory',function (socketFactory) {

  var mySocket = socketFactory();

  return mySocket;
}])
.controller('View1Ctrl', ['$scope','mySocket', function($scope,mySocket) {

  var self = this;
  self.sms = {};
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDVAzFNruUePIDKWACy5Acbsok4Cklrx9A",
    authDomain: "smsdruid-590fa.firebaseapp.com",
    databaseURL: "https://smsdruid-590fa.firebaseio.com",
    storageBucket: "smsdruid-590fa.appspot.com",
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var numbersRef = database.ref('/numbers');
  numbersRef.once('value').then(function(snapshot){
    console.log('value');
    console.log(snapshot.val());
    self.sms = snapshot.val();
    $scope.$apply();
  });
  numbersRef.on('child_added', function(data){
    console.log('child_added');
    console.log(data.val());
  });
  numbersRef.on('child_changed', function(data){
    console.log('child_changed');
    console.log(data);
    $scope.$apply();
  })

}])

