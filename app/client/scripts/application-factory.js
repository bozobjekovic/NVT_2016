angular.module('nvtClientApp')
    .factory('applicationFactory', ['Restangular', function(Restangular) {
        'use strict';

        var retVal = {};
		var application = {};
		var event = {};

		retVal.getApplication = function(id) {
			return Restangular.one("/api/applications/:id", {_id: '@id'}).get().then(function(entry) {
				application = entry;
				return application;
    		});
		};
		retVal.getEvent = function(id) {
			return Restangular.one("/api/events/:id", {_id: '@id'}).get().then(function(entry) {
				event = entry;
				return event;
    		});
		};

        return retVal;
    }]);