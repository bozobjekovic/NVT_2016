(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('applicationCtrl', ['$scope', '$routeParams', '$location', 'applicationFactory',
		    function($scope, $routeParams, $location, applicationFactory) {

			var param = $routeParams.param;
			
			applicationFactory.getApplication(param).then(function(item) {
				$scope.application = item;
			});
			$scope.getEvent = function(event){
				$location.path('/event/' + event._id);
			}
		}])
})(angular);