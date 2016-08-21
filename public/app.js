'use strict';

console.log('here')

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'btford.socket-io'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
      console.log('last')
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view2'});
}])
