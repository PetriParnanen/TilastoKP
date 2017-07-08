var fact = angular.module('StatApiFactory', ["ngResource"]);

fact.factory("TeamItem", function($resource) {
	return $resource("/api/teamlist/:id", {id: '@id'});
});



