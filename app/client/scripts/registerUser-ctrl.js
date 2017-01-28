(function (angular) {
	'use strict';

	angular
        .module('registerUser', [])
        .controller('registerUserCtrl', registerUserController);

    registerUserController.$inject = ['$scope', 'registerUserFactory'];

    function registerUserController($scope, registerUserFactory) {
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

})(angular);
