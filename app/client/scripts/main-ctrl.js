(function (angular) {
	'use strict';
	
	angular.module('nvtClientApp')
		.controller('mainCtrl', ['$scope', '$location', '$localStorage', '$rootScope', 'mainFactory',
		    function($scope, $location, $localStorage, $rootScope, mainFactory) {

			if($localStorage.currentUser != null){
				$rootScope.currentUser = true;
				$scope.user = $localStorage.currentUser;
			}

			$scope.userDTO = {
				email : '',
				password : ''
			}
		
			$scope.getApplication = function(application){
				$location.path('/application/' + application._id);
			}

			$scope.login = function(){
				mainFactory.login($scope.userDTO).then(function(item) {
					if(item != null){
		                $rootScope.currentUser = true;
						$localStorage.currentUser = item;
						$location.path('/applications');
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