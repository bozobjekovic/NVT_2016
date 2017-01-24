(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('eventCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'eventFactory', '$window',
		    function($scope, $routeParams, $location, $localStorage, eventFactory, $window) {

			var param = $routeParams.param;

            $scope.commCreate = {
                text: '',
                user: $localStorage.currentUser._id,
                event: param
            };
            $scope.commOnCommCreate = {
                text: '',
                user: $localStorage.currentUser._id,
                event: param
            };
			
			eventFactory.getEvent(param).then(function(item) {
				$scope.event = item;
			});
			
			eventFactory.getComments(param).then(function(items) {
				$scope.comments = items;
			});

            $scope.submitComment = function() {
            	eventFactory.submitComment($scope.commCreate).then(function(comm) {
            	});
            }
            
			$scope.getCommentsOnComment = function(id) {
				eventFactory.getCommentsFromComment(id).then(function(items) {
					$scope.commentsFromComment = items;
				});
			}

            $scope.submitCommentOnComment = function(id) {
            	eventFactory.submitCommentOnComment(id, $scope.commOnCommCreate).then(function(comm) {
                	$location.path('/event/' + param);
                	$window.location.reload();
            	});
            }
		}])
})(angular);