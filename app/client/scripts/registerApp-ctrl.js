(function (angular) {
	'use strict';

	angular.module('nvtClientApp')
        .controller('registerAppCtrl', ['$scope', 'registerAppFactory', '$localStorage',
            function($scope, registerAppFactory, $localStorage) {

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
        ]);

})(angular);
