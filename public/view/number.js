'use strict';

angular.module('smsdruid.numbers', ['ngRoute',"ngTable","ngSanitize"])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/numbers', {
            templateUrl: 'view/number.html',
            controller: 'NumberCtrl',
            controllerAs: 'ctrl'
        });
    }])
    .controller('NumberCtrl', ['$scope','NgTableParams',function ($scope,NgTableParams) {

        var self = this;
        var limit = 10; // only display the last 10 msg
        self.numbers = {};
        self.msgs = [];


        // it's OK to have the web api key here, as long as you lock the database access
        // using rules. https://www.firebase.com/docs/security/quickstart.html
        var config = {
            apiKey: "AIzaSyDVAzFNruUePIDKWACy5Acbsok4Cklrx9A",
            authDomain: "smsdruid-590fa.firebaseapp.com",
            databaseURL: "https://smsdruid-590fa.firebaseio.com",
            storageBucket: "smsdruid-590fa.appspot.com"
        };
        firebase.initializeApp(config); // Initialize Firebase
        var database = firebase.database();
        var numbersRef = database.ref('/numbers');
        var msgsRef = database.ref('/msgs').limitToLast(limit);

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

        msgsRef.once('value').then(function(snapshot){
            console.log(snapshot.val());
            // create the table
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
            // todo: this is currently inefficient, since it will be call multiple times.
            // todo: use once('value')
            // todo: http://ng-table.com/#/loading/demo-lazy-loaded
            self.tableParams = new NgTableParams({}, { dataset: self.msgs});
            $scope.$apply();
        })
    }])

