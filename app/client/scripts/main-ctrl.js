(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('mainCtrl', ['$scope', '$location', '$localStorage', 'mainFactory',
		    function($scope, $location, $localStorage, mainFactory) {

			$scope.userDTO = {
				email : '',
				password : ''
			}
		
			$scope.getApplication = function(application){
				$location.path('/application/' + application._id);
			}

			mainFactory.getApplications().then(function(items) {
				$scope.applications = items;
			});

			$scope.login = function(){
				mainFactory.login($scope.userDTO).then(function(item) {
					if(item != null){
						$localStorage.currentUser = item;
					}
					else{
						console.log('wrong');
					}
				});
			}
		}])
})(angular);