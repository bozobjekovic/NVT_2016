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

                $scope.submitUserForm = function() {
                	registerUserFactory.submitRegisterUser($scope.userCreate);
                };
            }
        ]);

})(angular);
