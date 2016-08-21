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
.controller('View1Ctrl', ['mySocket', function(mySocket) {

  var self = this;
  self.sms = [];
  mySocket.on('sms',function(data){
    console.log(data);
    self.sms.push(data);
  });
}])

