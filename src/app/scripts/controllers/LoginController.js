angular.module('LoginModule', []).controller('LoginController', 
	['$scope', 'userFactory', 'userToken', 
		function($scope, userFactory, userToken){

	$scope.form = {};

	//registration
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

	//login
	$scope.login = function(){
		console.log("Login");
		if ($scope.user == null || $scope.user.username == null || $scope.user.username == '' || $scope.user.password == null || $scope.user.password == ''){
			$scope.regStatus = 'error';
			$scope.message = 'LOGIN.GIVE_DATA';
		} else {
			$scope.regLoading = true;
			$scope.message = '';
			userFactory.login($scope.user)
				.then( function(data){
					userToken.setToken(data.data.token);
					console.log("logged in");
					$scope.regStatus = '';
					$scope.$emit('LoggedIn');
				}, function(error){
					$scope.regLoading = false;
					$scope.message = error.data.message;
					$scope.regStatus = 'error';
				})
		}
	};

}]);