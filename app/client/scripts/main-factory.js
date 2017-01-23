angular.module('nvtClientApp')
    .factory('mainFactory', ['Restangular', function(Restangular) {
        'use strict';

        var retVal = {};
		var applications = [];

		retVal.getApplications = function() {
			return Restangular.all("api/applications/").getList().then(function(entries) {
				applications = entries;
				return applications;
    		});
		};

		retVal.login = function(userDTO) {
			return Restangular.all("api/users/login").customPOST(userDTO).then(function(entry) {
				return entry;
    		});
		};

        return retVal;
    }]);