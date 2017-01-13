(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('mainCtrl', ['$scope', '$location', 'mainFactory',
		    function($scope, $location, mainFactory) {
		
			$scope.getApplication = function(application){
				$location.path('/application/' + application._id);
			}
			mainFactory.getApplications().then(function(items) {
				$scope.applications = items;
			});
		}])
})(angular);