angular.module('nvtClientApp')
    .factory('eventFactory', ['Restangular', function(Restangular) {
        'use strict';

        var retVal = {};
		var event = {};

		retVal.getEvent = function(id) {
			return Restangular.one("/api/events/:id", {_id: '@id'}).get().then(function(entry) {
				event = entry;
				return event;
    		});
		};

        return retVal;
    }]);