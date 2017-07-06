var app = angular.module("ShoppingListApp",["ngRoute","Controllers"]);

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

app.config(['$qProvider', function($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);

app.config(['$routeProvider',
  function($routeProvider) {
	$routeProvider.when('/shoppinglist', {
        templateUrl: 'views/shoppinglist.html',
        controller: 'ListController'
    }).
	when('/additem', {
        templateUrl: 'views/additem.html',
        controller: 'AddController'
    }).
    when('/finditem', {
        templateUrl: 'views/details.html',
        controller: 'ItemController'
    }).
   	otherwise({
		redirectTo: '/'
	});

}]);
 
