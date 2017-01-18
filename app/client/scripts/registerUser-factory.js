angular.module('nvtClientApp')
    .factory('registerUserFactory', ['Restangular', '$window', function(Restangular, $window) {
        'use strict';

        var retVal = {};

        retVal.submitRegisterUser = function(userCreate) {
            if (userCreate.email && userCreate.password && userCreate.name && userCreate.surName) {
                return Restangular.all('api/users/').post(userCreate).then(function(data) {
                	$location.path('/');
                    })
            } else {
                $window.alert('Fill required filleds!');
            }
        };

        return retVal;
    }]);
