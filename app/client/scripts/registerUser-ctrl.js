(function (angular) {
	'use strict';

	angular.module('nvtClientApp')
        .controller('registerUserCtrl', ['$scope', 'registerUserFactory',
            function($scope, registerUserFactory) {

                $scope.userCreate = {
                    email: '',
                    password: '',
                    name: '',
                    surName: ''
                };

                $scope.submitRegisterUser = function() {
	                registerUserFactory.submitRegisterUser($scope.userCreate).then(function(user) {
					      $scope.userCreate = user;
					});
                }
            }
        ]);

})(angular);
