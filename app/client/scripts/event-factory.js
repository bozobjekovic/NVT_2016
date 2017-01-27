angular.module('nvtClientApp')
	.factory('eventFactory', ['Restangular', '_', '$window', function(Restangular, $window) {
        'use strict';

        var retVal = {};
		var event = {};
		var comments = [];
		var commentsFromComment = [];

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
					comments.unshift(data);
                })
            } else {
                $window.alert('Fill required filleds!');
            }
        };
		
		retVal.getCommentsFromComment = function(id) {
			return Restangular.one("api/comments/comment/", id).getList().then(function(items) {
				if(items != null) {
					commentsFromComment = items.comments;
				}
				return commentsFromComment;
    		});
		};

        retVal.submitCommentOnComment = function(id, commOnCommCreate) {
            if (commOnCommCreate.text) {
            	console.log(commOnCommCreate);
                return Restangular.one('api/comments/comment/', id).customPOST(commOnCommCreate).then(function(data) {
                    })
            } else {
                $window.alert('Fill required filleds!');
            }
        };

        return retVal;
    }]);