(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('eventCtrl', ['$scope', '$rootScope', 'eventFactory',
		    function($scope, $rootScope, eventFactory) {

			eventFactory.getEvent($rootScope.event.id).then(function(item) {
			      $scope.event = item;
			});
		}])
})(angular);