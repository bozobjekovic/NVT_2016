(function (angular) {
	'use strict';

	angular.module('nvtClientApp')
        .controller('registerAppCtrl', ['$scope', '_', 'registerAppFactory',
            function($scope, _, registerAppFactory) {

                $scope.appCreate = {
                    name: '',
                    description: '',
                    version: '',
                    repositoryLink: '',
                    domain: ''
                };

                $scope.submitAppForm = function() {
                	registerAppFactory.submitRegisterApp($scope.appCreate);
                };
            }
        ]);

})(angular);
