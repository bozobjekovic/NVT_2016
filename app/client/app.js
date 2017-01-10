(function(angular) {
	'use strict';

  var app = angular.module('nvtClientApp', ['ngRoute','ngResource']);

  app.config(function($routeProvider) {
    $routeProvider
    .when('/index',{
      templateUrl: 'index.html'
    })
    .otherwise({
      redirectTo:'/index'
    });
  });
})(angular);