angular.module('nvtClientApp')
	.factory('eventFactory', ['Restangular', '$window', function(Restangular, $window) {
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
				}
				return comments;
    		});
		};

        retVal.submitComment = function(commCreate) {
            if (commCreate.text) {
                return Restangular.all('api/comments/').post(commCreate).then(function(data) {
                    })
            } else {
                $window.alert('Fill required filleds!');
            }
        };

        retVal.submitCommentOnComment = function(commOnCommCreate) {
            if (commOnCommCreate.text) {
                return Restangular.all('api/comments/comment/588131ad770c5ef288cb456c').post(commOnCommCreate).then(function(data) {
                    })
            } else {
                $window.alert('Fill required filleds!');
            }
        };

        return retVal;
    }]);