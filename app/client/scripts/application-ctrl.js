(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('applicationCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'applicationFactory',
		    function($scope, $routeParams, $location, $localStorage, applicationFactory) {

			var param = $routeParams.param;
			$scope.filter = {};

            $scope.user = {
                email: ''
            };

            $scope.inviteUser = function() {
            	applicationFactory.inviteUser($scope.user, param).then(function(user) {
				      $scope.user = user;
				});
            }
			
			$scope.optionClick = function(){
				applicationFactory.getEventsByFragment(param, $scope.filter.fragment).then(function(items) {
					$scope.events = items;
				});				
			}
			
			applicationFactory.getApplication(param).then(function(item) {
				$scope.application = item;
			});
			$scope.getEvent = function(event){
				$location.path('/event/' + event._id);
			}
			applicationFactory.getEvents(param).then(function(items) {
				$scope.events = items;
			});
		}])
})(angular);