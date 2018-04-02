angular.module('MainModule', []).controller('MainController', 
	['$scope', '$translate',
		function($scope, $translate){

	//This module handles language and if the user is logged in
	$scope.isLoggedIn = false;

	$scope.$on('LoggedIn', function() {
		$scope.isLoggedIn = true;
	});

	$scope.$on('LoggingOut', function() {
		$scope.isLoggedIn = false;
	})

	$scope.changeLanguage = function (langKey) {
    	$translate.use(langKey);
  	};

}]);