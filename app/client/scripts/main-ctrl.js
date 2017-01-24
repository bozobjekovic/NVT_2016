(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('mainCtrl', ['$scope', '$location', '$localStorage', '$rootScope', 'mainFactory',
		    function($scope, $location, $localStorage, $rootScope, mainFactory) {

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
		                $rootScope.currentUser = true;
						$localStorage.currentUser = item;
						$location.path('/');
					}
					else{
						console.log('wrong');
					}
				});
			}

            $scope.logOut = function(event) {
                $localStorage.$reset();
                $rootScope.currentUser = false;
                $location.path('/about');
            };
		}])
})(angular);