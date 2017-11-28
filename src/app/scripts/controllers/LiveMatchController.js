angular.module('LiveMatchModule', []).controller('LiveMatchController', 
	['$scope', 'statFactory', '$uibModalInstance', 'saveGame', 'modalTitle', 'matchData', 'sportId', 'teamId',
	function($scope, statFactory, $uibModalInstance, saveGame, modalTitle, matchData, sportId, teamId){

	$scope.matchData = matchData;
	$scope.sportId = sportId;
	$scope.teamId = teamId;
	$scope.matchData.finalPlayers = [];
	$scope.players = {};

	$scope.handleClick = function(evt, pid, eid) {
		switch(evt.which){
			case 1: 
				$scope.players[pid][eid]++;
				break;
			case 2:
				break;
			case 3:
				$scope.players[pid][eid]--;
				if ($scope.players[pid][eid]<0){ $scope.players[pid][eid]=0};
				break;
			default:
				alert("WHat, strange mouse");
				break;
		}
	};

	statFactory.getSportEvents($scope.sportId)
		.then(function(data){
			$scope.sportEvents = data;
		}, function(error){
				console.log(error);
		});

	angular.forEach(matchData.players, function(value, key){
		var myKey = Object.getOwnPropertyNames(value)[0];
		var myValue = value[myKey];
		var player = {};
		if (myValue == true){
			player = {"id": key, "number": myKey};
			$scope.players.key = {};
			$scope.matchData.finalPlayers.push(player);
		};
	});

	delete matchData.players;

	//form savings
    $scope.form = {};

    $scope.submitMatch = function() {
    	$scope.match.opponent = $scope.matchData.opponent;
    	$scope.match.matchday = $scope.matchData.matchday;
    	$scope.match.players = $scope.players;
        statFactory.addMatch($scope.teamId, $scope.match);
        $uibModalInstance.close('Match saved');
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }

}]);