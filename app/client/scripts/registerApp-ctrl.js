(function (angular) {
	'use strict';

	angular
        .module('registerApp', [])
        .controller('registerAppCtrl', registerAppController);

    registerAppController.$inject = ['$scope', 'registerAppFactory', '$localStorage'];

    function registerAppController($scope, registerAppFactory, $localStorage) {
        $scope.appCreate = {
            name: '',
            description: '',
            version: '',
            repositoryLink: '',
            domain: ''
        };

        $scope.submitAppForm = function() {
            registerAppFactory.submitRegisterApp($scope.appCreate, $localStorage.currentUser._id);
        }
    }

})(angular);
