'use strict';

angular.module('smsdruid.numbers', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/numbers', {
            templateUrl: 'view/number.html',
            controller: 'NumberCtrl',
            controllerAs: 'ctrl'
        });
    }])
    .controller('NumberCtrl', ['$scope', function ($scope) {

        var self = this;
        self.numbers = {};
        self.msgs = [];


        // todo: hide the credential
        var config = {
            apiKey: "AIzaSyDVAzFNruUePIDKWACy5Acbsok4Cklrx9A",
            authDomain: "smsdruid-590fa.firebaseapp.com",
            databaseURL: "https://smsdruid-590fa.firebaseio.com",
            storageBucket: "smsdruid-590fa.appspot.com"
        };
        firebase.initializeApp(config); // Initialize Firebase
        var database = firebase.database();
        var numbersRef = database.ref('/numbers');
        var msgsRef = database.ref('/msgs').limitToLast(10);

        self.signOut = function () {
            firebase.auth().signOut();
        };

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // do nothing, wait for messages to load if the user has the right permission to the database
            } else {
                window.location.replace("/");
            }

        });

        // display all the numbers
        numbersRef.once('value').then(function (snapshot) {
            self.numbers = snapshot.val();
            $scope.$apply();
        });

        // show all the messages
        msgsRef.on('child_added', function (snapshot) {
            var value = snapshot.val();
            var msg_body = value.Body;
            if (msg_body) {
                // convert the url to html hyperlinks
                msg_body = msg_body.autoLink();
                value.Body = msg_body;
            }
            self.msgs.unshift(value); // add the new msg to the top
            $scope.$apply();
        })
    }])

