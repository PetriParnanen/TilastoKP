angular.module('LiveMatchModule', []).controller('LiveMatchController', 
	['$scope', 'statFactory', '$uibModalInstance', 'saveGame', 'modalTitle', 'matchData', 'sportId', 'sportName', 'teamId', '$window', 
	function($scope, statFactory, $uibModalInstance, saveGame, modalTitle, matchData, sportId, sportName, teamId, $window){

	$scope.matchData = matchData;
	$scope.sportId = sportId;
	$scope.sportName = sportName;
	$scope.teamId = teamId;
	$scope.matchData.finalPlayers = [];
	$scope.players = {};
	$scope.counter = 0;

	// handles addition or removal of value in form
	$scope.handleClick = function(evt, pid, eid) {
		$scope.counter++;
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
				alert("What, strange mouse");
				break;
		}
	};

	// get all events for sport
	statFactory.fetchApiData('sportEvent', 'get', {'sportId':$scope.sportId})
		.then(function(data){
			$scope.sportEvents = data.data;
		}, function(error){
				console.log(error);
		});

	// reshapes data before opening the form
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

    // saves match
    $scope.submitMatch = function() {
    	$scope.match.opponent = $scope.matchData.opponent;
    	$scope.match.matchday = $scope.matchData.matchday;
    	$scope.match.players = $scope.players;
    	statFactory.fetchApiData('teamMatch', 'post', {'teamId':$scope.teamId, 'data':$scope.match})
    		.then( function(responce) {
    			$uibModalInstance.close('Match saved');
    			$scope.$emit("showInnerMessage", {status: 'success', message: 'MATCH.SAVESUCCESS' });
    		}, function(error){
    			$scope.matchPopupMessage = 'DB.ERR.NOSAVE';
    		});
    };

    $scope.cancel = function() {
    	if($scope.counter == 0 || $window.confirm("are you sure")){
        	$uibModalInstance.dismiss('cancel');
        }
    }

}]);