angular.module('nvtClientApp')
    .factory('registerAppFactory', ['Restangular', '$location', '$window',
        function(Restangular, $location, $window) {
            'use strict';

            var retVal = {};

            retVal.submitRegisterApp = function(appCreate, id) {
                if (appCreate.name && appCreate.description && appCreate.domain) {
                    return Restangular.one('api/applications/creator/', id)
                    .post(appCreate).then(function(data) {
                    	$location.path('/');
                        })
                } else {
                    $window.alert('Fill required filleds!');
                }
            };

            return retVal;
        }]);
