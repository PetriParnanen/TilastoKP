angular.module('MainModule', []).controller('MainController', 
	['$scope', '$translate', 'userFactory', 'userToken',
		function($scope, $translate, userFactory, userToken){

	//This module handles language and if the user is logged in
	$scope.isLoggedIn = false;

	if (userFactory.isLoggedIn()){
		$scope.isLoggedIn = true;
	};

	// sniffing other controllers if they yell log in
	$scope.$on('LoggedIn', function() {
		$scope.isLoggedIn = true;
	});

	// sniff other controllers if they yell log out. if so then empty token
	$scope.$on('LoggingOut', function() {
		userToken.setToken();
		$scope.isLoggedIn = false;
	})

	// if user chances language, then chance texts
	$scope.changeLanguage = function (langKey) {
    	$translate.use(langKey);
  	};

}]);