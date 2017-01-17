angular.module('nvtClientApp')
    .factory('eventFactory', ['Restangular', function(Restangular) {
        'use strict';

        var retVal = {};
		var event = {};
		var comments = [];

		retVal.getEvent = function(id) {
			return Restangular.one("api/events/", id).get().then(function(entry) {
				event = entry;
				return event;
    		});
		};
		retVal.getComments = function(id) {
			return Restangular.one("api/comments/event/", id).get().then(function(item) {
				if(item != null) {
					comments = item.comments;
					console.log(comments);
				}
				return comments;
    		});
		};

        return retVal;
    }]);