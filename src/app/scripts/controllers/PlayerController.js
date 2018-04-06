angular.module('PlayerModule', []).controller('PlayerController', 
	['$scope', 'statFactory', '$uibModalInstance', 'savePlayer', 'modalTitle', 'teamId', 'playerId',
	function($scope, statFactory, $uibModalInstance, savePlayer, modalTitle, teamId, playerId){
	
	$scope.modalTitle = modalTitle;
	$scope.playerId = playerId;
	$scope.teamId = teamId;

	// if player exists then fetch player data
	if($scope.playerId){
		statFactory.fetchApiData('teamPlayerId', 'get', { 'teamId':$scope.teamId, 'playerId':$scope.playerId })
			.then(function(data) {
				$scope.player = {};
				$scope.player.firstname=data.data.player_id.firstname;
				$scope.player.lastname=data.data.player_id.lastname;
				$scope.player.nickname=data.data.nickname;
				$scope.player.number=data.data.number;
				$scope.player.joining_date=new Date(data.data.joining_date);
				$scope.player.leaving_date=new Date(data.data.leaving_date);
			}, function(error){
				console.log("Could not load team");
			});
	};

	//datepicker stuff
	$scope.today = function(){
		$scope.jdate = new Date();
	};
	$scope.today();

	$scope.playerDateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	$scope.open2 = function() {
		$scope.popup2.opened = true;
	};

	$scope.popup2 = {
		opened: false
	};

	$scope.open3 = function() {
		$scope.popup3.opened = true;
	};

	$scope.popup3 = {
		opened: false
	};
	//end of datepicker stuff

	//form savings
    $scope.form = {};

    // save player (if exists then updata else add new player)
    $scope.submitPlayer = function() {
    	if ($scope.playerId){
    		statFactory.fetchApiData('teamPlayerId', 'put', { 'teamId':$scope.selectedTeam._id, 'playerId':$scope.playerId, 'data':$scope.player })
    			.then(function(){ $uibModalInstance.close('Player saved'); },
    				function(error) {console.log(error)});
    	} else {
        	statFactory.fetchApiData('teamPlayer', 'post', { 'teamId':$scope.selectedTeam._id, 'data':$scope.player })
        		.then(function(){ $uibModalInstance.close('Player saved'); },
        			function(error) {console.log(error)});
        }
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }

}]);