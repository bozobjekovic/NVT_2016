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

        return retVal;
    }]);