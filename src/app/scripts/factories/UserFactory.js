angular.module('UserFactory', [])
	.config(['$httpProvider', function($httpProvider) {
		if (!$httpProvider.defaults.headers.get) {
       		$httpProvider.defaults.headers.get = {};    
    	}    

    	//disable IE ajax request caching
    	$httpProvider.defaults.headers.common['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    	// no cache no matter what
    	$httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
    	$httpProvider.defaults.headers.common['Pragma'] = 'no-cache';
    	$httpProvider.defaults.headers.common['Content-type'] = 'application/json';
	}])
	.factory('userFactory', ['$http', function($http){

	var userFactory = {};

	userFactory.register = function(userData) {
		return $http.post('http://localhost:3000/register', userData);
	};

	userFactory.login = function(userData) {
		return $http.post('http://localhost:3000/login', userData);
	};

	return userFactory;
}]);