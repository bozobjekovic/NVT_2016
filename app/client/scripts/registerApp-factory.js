angular.module('nvtClientApp')
    .factory('registerAppFactory', ['Restangular', '$location', '$window', '$localStorage', 'mainFactory',
        function(Restangular, $location, $window, $localStorage, mainFactory) {
            'use strict';

            var retVal = {};

            retVal.submitRegisterApp = function(appCreate, id) {
                if (appCreate.name && appCreate.description && appCreate.domain) {
                    return Restangular.one('api/applications/creator/', id)
                    .customPOST(appCreate).then(function(data) {
                        if(data.found){
                            $window.alert('Domain already exists!');
                        }
                        else{
                            mainFactory.getUser($localStorage.currentUser._id).then(function(item) {
                                $localStorage.currentUser = item;
                                $location.path('/applications');
                            });
                        }
                    })
                } else {
                    $window.alert('Fill required filleds!');
                }
            };

            return retVal;
        }]);
