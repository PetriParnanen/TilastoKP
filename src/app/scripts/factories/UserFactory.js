angular.module('UserFactory', [])
	.config(['$httpProvider', function($httpProvider) {
		if (!$httpProvider.defaults.headers.get) {
       		$httpProvider.defaults.headers.get = {};    
    	}    

    	//disable IE ajax request caching, prolly not needed cause these ain't get reguests
    	$httpProvider.defaults.headers.common['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    	// no cache no matter what
    	$httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
    	$httpProvider.defaults.headers.common['Pragma'] = 'no-cache';
    	$httpProvider.defaults.headers.common['Content-type'] = 'application/json';
	}])
	.factory('userFactory', ['$http', 'userToken', function($http, userToken){

	var userFactory = {};

	// registers user
	userFactory.register = function(userData) {
		return $http.post('http://localhost:3000/register', userData);
	};

	// login user
	userFactory.login = function(userData) {
		return $http.post('http://localhost:3000/login', userData);
	};

	// is user logged in (checks from token)
	userFactory.isLoggedIn = function() {
		if (userToken.getToken()){
			return true;
		} else {
			return false;
		}
	};

	// get user data, not uset right now
	userFactory.getUser = function(){
		if (userToken.getToken()){
			return $http.post('http://localhost:3000/api/me');
		} else {
			$q.reject({ message: 'DB.ERR.NOTOKEN' });
		}
	};

	return userFactory;
}])

.factory('userToken', ['$window', function($window){
	var userTokenFactory = {};

	// sets new value to token to localstorage. if empty removes token
	userTokenFactory.setToken = function(token) {
		if (token){
			$window.localStorage.setItem('token', token);
		} else {
			$window.localStorage.clear();
		}
	};

	// get existing token
	userTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	}

	return userTokenFactory;
}]);