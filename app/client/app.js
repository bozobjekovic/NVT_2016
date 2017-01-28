(function(angular) {
	'use strict';

  angular
    .module('nvtClientApp', [
        'ngRoute',
        'restangular',
        'ui.bootstrap',
        'angular.filter',
        'lodash',
        'ngStorage',
		'main',
		'application',
		'event',
		'registerApp',
		'registerUser'
    ])
    .config(configure)
    .run(runBlock);

    configure.$inject = ['$routeProvider', '$locationProvider'];
	runBlock.$inject = ['Restangular', '$log'];

    function configure($routeProvider, $locationProvider) {
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
    }

    function runBlock(Restangular, $log) {
        Restangular.setErrorInterceptor(function(response) {
            if (response.status === 500) {
                $log.info("internal server error");
                return true;
            }
            return true;
        });
    }

})(angular);