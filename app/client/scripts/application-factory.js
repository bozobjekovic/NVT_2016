angular.module('nvtClientApp')
    .factory('applicationFactory', ['Restangular','$location', '$window',
        	function(Restangular, $location, $window) {
        'use strict';

        var retVal = {};

		retVal.getApplication = function(id) {
			return Restangular.one("api/applications/", id).get().then(function(entry) {
				return entry;
    		});
		};

		retVal.getEvents = function(userId, id) {
			return Restangular.one("api/users/", userId).one("/events/app/", id).getList().then(function(items) {
				return items;
    		});
		};
		
		retVal.getUsers = function() {
			return Restangular.all("api/users/").getList().then(function(items) {
				return items;
    		});
		};

		retVal.getEventsByFragment = function(userId, id, frag) {
			return Restangular.one("api/users/", userId).one("/events/app/", id).one("/fragment/", frag).getList().then(function(items) {
				return items;
    		});
		};

        retVal.inviteUser = function(user, id) {
            if (user.email) {
                return Restangular.one('api/applications/', id).one('/addUser/', user.email).put(user);
            } else {
                $window.alert('Fill required filleds!')
            }
        };

        return retVal;
    }]);