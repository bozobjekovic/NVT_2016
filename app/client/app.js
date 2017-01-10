(function(angular) {
	'use strict';

  angular
    .module('nvtClientApp', [
        'ngResource',
        'ngRoute',
        'restangular'
    ])
    .config(function($routeProvider) {
        $routeProvider
        .when('/',{
          templateUrl: 'views/main.html'
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