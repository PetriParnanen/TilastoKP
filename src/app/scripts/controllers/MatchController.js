angular.module('MatchModule', []).controller('MatchController', function($scope, TeamFactory){
	$scope.teamPlayers = TeamFactory.getTeamsPlayers("1");
});