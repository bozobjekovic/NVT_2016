angular.module('nvtClientApp')
    .factory('applicationFactory', ['Restangular','$location', function(Restangular, $location) {
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

		retVal.getEvents = function(id) {
			return Restangular
			.one("api/users/587559d3b586987127acff74/events/app/", id)
			.getList().then(function(items) {
				events = items;
				return events;
    		});
		};

		retVal.getEventsByFragment = function(id) {
			return Restangular
			.one("api/users/587559d3b586987127acff74/events/app/", id).one("/fragment/Backend")
			.getList().then(function(items) {
				eventsByFragment = items;
				return eventsByFragment;
    		});
		};

        retVal.inviteUser = function(user, id) {
            if (user.email) {
                return Restangular.one('api/applications/', id).one('/addUser/5877d9eac9b7301ef0825cff')
                .put(user).then(function(data) {
                	$location.path('/application/'+id);
                    })
            } else {
                $window.alert('Fill required filleds!');
            }
        };

        return retVal;
    }]);