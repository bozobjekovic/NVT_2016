(function (angular) {
	'use strict';

	angular.module('nvtClientApp')
        .controller('registerAppCtrl', ['$scope', 'registerAppFactory',
            function($scope, registerAppFactory) {

                $scope.appCreate = {
                    name: '',
                    description: '',
                    version: '',
                    repositoryLink: '',
                    domain: ''
                };

                $scope.submitAppForm = function() {
                	registerAppFactory.submitRegisterApp($scope.appCreate).then(function(app) {
                		$scope.appCreate = app;
                	});
                }
            }
        ]);

})(angular);
