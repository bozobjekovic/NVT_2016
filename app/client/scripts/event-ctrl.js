(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('eventCtrl', ['$scope', '$routeParams', 'eventFactory',
		    function($scope, $routeParams, eventFactory) {

			var param = $routeParams.param;
			
			eventFactory.getEvent(param).then(function(item) {
				$scope.event = item;
			});
			eventFactory.getComments(param).then(function(items) {
				$scope.comments = items;
			});
		}])
})(angular);