(function (angular) {
	'use strict';
	
	angular
		.module('event', [])
		.controller('eventCtrl', eventController);

	eventController.$inject = ['$scope', '$routeParams', '$location', '$localStorage', 'eventFactory'];

	function eventController($scope, $routeParams, $location, $localStorage, eventFactory) {
		var param = $routeParams.param;

		$scope.commCreate = {
			text: '',
			user: $localStorage.currentUser._id,
			event: param
		};

		$scope.commOnCommCreate = {
			text: '',
			user: $localStorage.currentUser._id,
			createdAt : new Date()
		};
		
		eventFactory.getEvent(param).then(function(item) {
			$scope.event = item;
		});
		
		eventFactory.getComments(param).then(function(items) {
			$scope.comments = items;
		});

		$scope.submitComment = function() {
			eventFactory.submitComment($scope.commCreate);
		}
		
		$scope.getCommentsOnComment = function(id) {
			eventFactory.getCommentsFromComment(id).then(function(items) {
				$scope.commentsFromComment = items;
			});
		}

		$scope.submitCommentOnComment = function(id) {
			eventFactory.submitCommentOnComment(id, $scope.commOnCommCreate);
		}
	}

})(angular);