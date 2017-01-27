angular.module('nvtClientApp')
    .factory('registerUserFactory', ['Restangular', '$window', '$location', function(Restangular, $window, $location) {
        'use strict';

        var retVal = {};

        retVal.submitRegisterUser = function(userCreate) {
            if (userCreate.email && userCreate.password && userCreate.name && userCreate.surName) {
                return Restangular.all('api/users/').post(userCreate).then(function(data) {
                    if(data.found){
                        $window.alert('Email already exists!');
                    }
                    else{
                	    $location.path('/');
                    }
                })
            } else {
                $window.alert('Fill required filleds!');
            }
        };

        return retVal;
    }]);
