angular.module('nvtClientApp')
    .factory('mainFactory', ['Restangular', function(Restangular) {
        'use strict';

        var retVal = {};

		retVal.login = function(userDTO) {
			return Restangular.all("api/users/login").customPOST(userDTO).then(function(entry) {
				return entry;
    		});
		};

        return retVal;
    }]);