(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('applicationCtrl', ['$scope', '$rootScope', 'applicationFactory',
		    function($scope, $rootScope, applicationFactory) {

			applicationFactory.getApplication($rootScope.application.id).then(function(item) {
			      $scope.application = item;
			});
			applicationFactory.getEvent($rootScope.event.id).then(function(item) {
			      $scope.event = item;
			});
		}])
})(angular);