(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('applicationCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'applicationFactory',
		    function($scope, $routeParams, $location, $localStorage, applicationFactory) {

			var param = $routeParams.param;
			$scope.filter = [];
			$scope.sortOrder = 'timeStamp';

            $scope.user = {
                email: ''
            };
			
			applicationFactory.getApplication(param).then(function(item) {
				$scope.application = item;
			});
			
			applicationFactory.getEvents($localStorage.currentUser._id, param).then(function(items) {
				$scope.events = items;
			});
			
			// FIX BUG
			$scope.optionClick = function(){
				for (var property in $scope.filter) {
				    if ($scope.filter.hasOwnProperty(property)) {
				    	var fragment = $scope.filter[property].fragment;
						applicationFactory.getEventsByFragment($localStorage.currentUser._id, param, fragment).then(function(items) {
							$scope.events = items;
						});	
				    }
				}			
			}

            $scope.inviteUser = function() {
            	applicationFactory.inviteUser($scope.user, param).then(function(user) {
                	$scope.user = user;
				});
            }
			
			$scope.getEvent = function(event){
				$location.path('/event/' + event._id);
			}
		}])
})(angular);