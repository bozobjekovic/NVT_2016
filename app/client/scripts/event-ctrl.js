(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('eventCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'eventFactory',
		    function($scope, $routeParams, $location, $localStorage, eventFactory) {

			var param = $routeParams.param;

            $scope.commCreate = {
                text: '',
                user: $localStorage.currentUser._id
            };
            $scope.commOnCommCreate = {
                    text: '',
                    user: $localStorage.currentUser._id
                };
			
			eventFactory.getEvent(param).then(function(item) {
				$scope.event = item;
			});
			eventFactory.getComments(param).then(function(items) {
				$scope.comments = items;
			});

            $scope.submitComment = function() {
            	eventFactory.submitComment($scope.commCreate).then(function(comm) {
            		$scope.commCreate = comm;
                	$location.path('/event/' + param);
            	});
            }

            $scope.submitCommentOnComment = function() {
            	eventFactory.submitCommentOnComment($scope.commOnCommCreate).then(function(comm) {
            		$scope.commOnCommCreate = comm;
                	$location.path('/event/' + param);
            	});
            }
		}])
})(angular);