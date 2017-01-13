angular.module('nvtClientApp')
    .factory('eventFactory', ['Restangular', function(Restangular) {
        'use strict';

        var retVal = {};
		var event = {};
		var events = [];

		retVal.getEvents = function() {
			return Restangular.all("api/events/").getList().then(function(items) {
				events = items;
				return events;
    		});
		};
		retVal.getEvent = function(id) {
			return Restangular.one("api/events/", id).get().then(function(entry) {
				event = entry;
				return event;
    		});
		};

        return retVal;
    }]);