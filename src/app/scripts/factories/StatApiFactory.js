var fact = angular.module('StatApiFactory', ["ngResource"]);

fact.factory("TeamItem", function($resource) {
	return $resource("/api/teamlist/:id", {id: '@id'});
});

fact.factory("SportItem", function($resource) {
	return $resource("/api/sportlist/:id", {id: '@id'});
});



