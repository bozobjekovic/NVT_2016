angular.module('nvtClientApp')
    .factory('registerAppFactory', ['Restangular', '$location', '$window',
        function(Restangular, $location, $window) {
            'use strict';

            var retVal = {};

            retVal.submitRegisterApp = function(appCreate) {
                if (appCreate.name && appCreate.description && appCreate.domain) {
                    return Restangular.all('/api/applications/creator/:id', {_id: '@id'}).post(appCreate)
                        .then(function(data) {
                            $location.path('/');
                        })
                } else {
                    $window.alert('Fill required filleds!');
                }
            };

            return retVal;
        }
    ]);
