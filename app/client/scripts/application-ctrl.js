(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('applicationCtrl', ['$scope', '$routeParams', '$location', '$localStorage', 'applicationFactory',
		    function($scope, $routeParams, $location, $localStorage, applicationFactory) {

			var param = $routeParams.param;
			$scope.filter = null;
			$scope.fragments = [];
			$scope.timelineEvents = [];
			$scope.showMainType = true;
			$scope.sortByTime = 'timeStamp';
			$scope.sortByVersion = 'version';

            $scope.user = {
                email: ''
            };
			
			applicationFactory.getApplication(param).then(function(item) {
				$scope.application = item;
			});
			
			applicationFactory.getEvents($localStorage.currentUser._id, param).then(function(items) {
				$scope.events = items;

				$scope.fragments.push('All');
				$scope.filter = $scope.fragments[0];
				for (var i = 0; i < items.length; i++) {
					$scope.fragments.push(items[i].fragment);
				}
			});
			
			$scope.optionClick = function(){
				if ($scope.filter === 'All') { 
					$scope.showMainType = true;

					applicationFactory.getEvents($localStorage.currentUser._id, param).then(function(items) {
						$scope.events = items;
					});
				} else {
					$scope.showMainType = false;

					$scope.timelineEvents = [];
					applicationFactory.getEventsByFragment($localStorage.currentUser._id, param, $scope.filter).then(function(items) {
						var date = new Date(items[0].timeStamp);
						date.setHours(0, 0, 0, 0);
						$scope.timelineEvents.push({
							date : date,
							events : [items[0]]
						});
						for (var i = 1; i < items.length; i++) {
							var datee = new Date(items[i].timeStamp);
							datee.setHours(0, 0, 0, 0);
							var exist = false;
							for (var j = 0; j < $scope.timelineEvents.length; j++) {
								if (datee.getTime() == $scope.timelineEvents[j].date.getTime()) {
									$scope.timelineEvents[j].events.push(items[i]);
									exist = true;
									break;
								}
							}
							if (!exist) {
								$scope.timelineEvents.push({
									date : datee,
									events : [items[i]]
								});
							}
						}
					});
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