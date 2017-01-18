(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('eventCtrl', ['$scope', '$routeParams', '$location', 'eventFactory',
		    function($scope, $routeParams, $location, eventFactory) {

			var param = $routeParams.param;

            $scope.commCreate = {
                text: '',
                user: '587559d3b586987127acff74'
            };
            $scope.commOnCommCreate = {
                    text: '',
                    user: '587559d3b586987127acff74'
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
            	eventFactory.submitCommentOnComment($scope.commOnCommCreate).then(function(comm, param) {
            		$scope.commOnCommCreate = comm;
                	$location.path('/event/' + param);
            	});
            }
		}])
})(angular);