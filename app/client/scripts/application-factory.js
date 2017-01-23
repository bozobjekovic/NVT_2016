angular.module('nvtClientApp')
    .factory('applicationFactory', ['Restangular','$location', '$window',
                                    function(Restangular, $location, $window) {
        'use strict';

        var retVal = {};
		var application = {};
		var events = [];
		var eventsByFragment = [];

		retVal.getApplication = function(id) {
			return Restangular.one("api/applications/", id).get().then(function(entry) {
				application = entry;
				return application;
    		});
		};

		retVal.getEvents = function(userId, id) {
			return Restangular
			.one("api/users/", userId).one("/events/app/", id)
			.getList().then(function(items) {
				events = items;
				return events;
    		});
		};

		retVal.getEventsByFragment = function(userId, id, frag) {
			return Restangular
			.one("api/users/", userId).one("/events/app/", id).one("/fragment/", frag)
			.getList().then(function(items) {
				eventsByFragment = items;
				return eventsByFragment;
    		});
		};

        retVal.inviteUser = function(user, id) {
            if (user.email) {
                return Restangular.one('api/applications/', id).one('/addUser/', user.email)
                .put(user).then(function(data) {
                	$location.path('/application/'+id);
                    })
            } else {
                $window.alert('Fill required filleds!');
            }
        };

        return retVal;
    }]);