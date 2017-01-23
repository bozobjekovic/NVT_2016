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
            		$scope.commCreate = comm;
                	$location.path('/event/' + param);
                	$window.location.reload();
            	});
            }

            $scope.submitCommentOnComment = function() {
            	eventFactory.submitCommentOnComment($scope.commOnCommCreate).then(function(comm) {
            		$scope.commOnCommCreate = comm;
                	$location.path('/event/' + param);
                	$window.location.reload();
            	});
            }
		}])
})(angular);