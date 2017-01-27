(function(angular) {
	'use strict';

  angular
    .module('nvtClientApp', [
        'ngResource',
        'ngRoute',
        'restangular',
        'ui.bootstrap',
        'angular.filter',
        'lodash',
        'ngStorage'
    ])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider
          .when('/',{
            templateUrl: 'views/login.html',
            controller: 'mainCtrl'
          })
          .when('/about',{
            templateUrl: 'views/about.html'
          })
          .when('/registerApplication',{
            templateUrl: 'views/registerApplication.html',
            controller: 'registerAppCtrl'
          })
          .when('/applications',{
            templateUrl: 'views/main.html',
            controller: 'mainCtrl'
          })
          .when('/register',{
            templateUrl: 'views/register.html',
            controller: 'registerUserCtrl'
          })
          .when('/application/:param',{
            templateUrl: 'views/application.html',
            controller: 'applicationCtrl'
          })
          .when('/event/:param',{
            templateUrl: 'views/event.html',
            controller: 'eventCtrl'
          })
          .otherwise({
            redirectTo:'/'
          });
    }])
})(angular);