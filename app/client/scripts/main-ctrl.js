(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('mainCtrl', ['$scope', 'mainFactory',
		    function($scope, mainFactory) {
		
			mainFactory.getApplications().then(function(items) {
			      $scope.applications = items;
			});
		}])
})(angular);