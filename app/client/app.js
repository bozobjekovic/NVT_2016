(function(angular) {
	'use strict';

  angular
    .module('nvtClientApp', [
        'ngResource',
        'ngRoute',
        'restangular',
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
		.when('/application',{
		  templateUrl: 'views/application.html',
          controller: 'applicationCtrl'
		})
		.when('/event',{
		  templateUrl: 'views/event.html',
          controller: 'eventCtrl'
		})
        .otherwise({
          redirectTo:'/'
        });
     })
     .run(['Restangular', '$log', function(Restangular, $log) {
        Restangular.setBaseUrl('app');
        Restangular.setErrorInterceptor(function(response) {
            if (response.status === 500) {
                $log.info("internal server error");
                return true;
            }
            return true;
        });
    }]);
})(angular);