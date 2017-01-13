angular.module('nvtClientApp')
    .factory('applicationFactory', ['Restangular', function(Restangular) {
        'use strict';

        var retVal = {};
		var application = {};

		retVal.getApplication = function(id) {
			return Restangular.one("api/applications/", id).get().then(function(entry) {
				application = entry;
				return application;
    		});
		};

        return retVal;
    }]);