angular.module('MainModule', []).controller('MainController', function($scope,TeamItem,$filter){
	
	TeamItem.query().$promise.then(function(data) {
		$scope.teams = data;
		$scope.selectedTeam = data[0];
	});

	$scope.changeContent = function() {
		$scope.$broadcast("changeContent");
	};

});