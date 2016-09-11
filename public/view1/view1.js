'use strict';

angular.module('myApp.view1', ['ngRoute','btford.socket-io'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/msg', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl',
        controllerAs :'ctrl',
        resolve: {
          //factory : 'mySocket'
        }
      });
    }])

    .controller('View1Ctrl', ['$scope', function($scope) {

      var self = this;
      self.numbers = {};
      self.msgs = {};

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
      var msgsRef = database.ref('/msgs').limitToFirst(20);

      numbersRef.once('value').then(function(snapshot){
        self.numbers = snapshot.val();
        $scope.$apply();
      });

      /*msgsRef.once('value').then(function(snapshot){
        self.msgs = snapshot.val();
        $scope.$apply();
      });*/

      msgsRef.on('child_added',function(snapshot){
        var value = snapshot.val();
        var key = snapshot.getKey();
        self.msgs[key] = value;
        $scope.$apply();
      })

    }])

