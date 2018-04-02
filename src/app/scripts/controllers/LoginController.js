angular.module('LoginModule', []).controller('LoginController', 
	['$scope', 'userFactory',
		function($scope, userFactory){

	$scope.form = {};

	$scope.register = function(){
		console.log("register");
		$scope.regStatus = false;
		if ($scope.user == null || $scope.user.username == null || $scope.user.username == '' || $scope.user.password == null || $scope.user.password == ''){
				$scope.regStatus = 'error';
				$scope.message = 'LOGIN.GIVE_DATA';
		} else {
			$scope.regLoading = true;
			$scope.message = '';
			userFactory.register($scope.user)
				.then( function() {
					$scope.regLoading = false;
					$scope.regStatus = 'success';
					$scope.message = 'LOGIN.REG_SUCCESS';
				}, function(error) { 
					$scope.regLoading = false;
					$scope.regStatus = 'error';
					$scope.message = error.data.message;
				}
			);
		}
	};

	$scope.login = function(){
		console.log("Login");
		console.log($scope.user);
		if ($scope.user == null || $scope.user.username == null || $scope.user.username == '' || $scope.user.password == null || $scope.user.password == ''){
			$scope.regStatus = 'error';
			$scope.message = 'LOGIN.GIVE_DATA';
		} else {
			$scope.regLoading = true;
			$scope.message = '';
			userFactory.login($scope.user)
				.then( function(){
					$scope.$emit('LoggedIn');
					console.log("logged in");
					$scope.regStatus = '';
				}, function(error){
					$scope.regLoading = false;
					$scope.message = error.data.message;
					$scope.regStatus = 'error';
				})
		}
	};

}]);