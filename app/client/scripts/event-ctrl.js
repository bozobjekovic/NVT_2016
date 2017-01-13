(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('eventCtrl', ['$scope', '$routeParams', 'eventFactory',
		    function($scope, $routeParams, eventFactory) {

			var param = $routeParams.param;
			
			eventFactory.getEvents().then(function(items) {
				$scope.events = items;
			});
			eventFactory.getEvent(param).then(function(item) {
				$scope.event = item;
			});
		}])
})(angular);