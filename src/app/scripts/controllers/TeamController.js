angular.module('TeamModule', []).controller('TeamController', function($scope,TeamPlayersItem,$filter){
	
	$scope.refreshPlayers = function() {
		TeamPlayersItem.get({teamid: $scope.selectedTeam.id}).$promise.then(function(data) {
			$scope.players = data.players;
		});
	};

	$scope.$on("changeContent", function() {
		$scope.refreshPlayers();
	});

	$scope.refreshPlayers();
});