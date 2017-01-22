(function(angular) {
	'use strict';

  angular
    .module('nvtClientApp', [
        'ngResource',
        'ngRoute',
        'restangular',
        'angular.filter',
        'lodash'
    ])
    .config(function($routeProvider) {
        $routeProvider
        .when('/',{
            templateUrl: 'views/main.html',
            controller: 'mainCtrl'
          })
		.when('/about',{
		  templateUrl: 'views/about.html'
		})
		.when('/registerApplication',{
		  templateUrl: 'views/registerApplication.html',
          controller: 'registerAppCtrl'
		})
		.when('/login',{
		  templateUrl: 'views/login.html'
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
     })
})(angular);