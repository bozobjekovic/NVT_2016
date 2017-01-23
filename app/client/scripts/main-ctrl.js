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

			if($localStorage.currentUser != null)
				$scope.applications = $localStorage.currentUser.followedApps;

			$scope.login = function(){
				mainFactory.login($scope.userDTO).then(function(item) {
					if(item != null){
						$localStorage.currentUser = item;
						$location.path('/');
					}
					else{
						console.log('wrong');
					}
				});
			}
		}])
})(angular);