angular.module('PlayerModule', []).controller('PlayerController', 
	['$scope', 'statFactory', '$uibModalInstance', 'savePlayer', 'modalTitle', 'teamId', 'playerId',
	function($scope, statFactory, $uibModalInstance, savePlayer, modalTitle, teamId, playerId){
	
	$scope.modalTitle = modalTitle;
	$scope.playerId = playerId;
	$scope.teamId = teamId;

	if($scope.playerId){
		statFactory.getTeamPlayer($scope.teamId, $scope.playerId)
			.then(function(data) {
				$scope.player = {};
				$scope.player.firstname=data.player_id.firstname;
				$scope.player.lastname=data.player_id.lastname;
				$scope.player.nickname=data.nickname;
				$scope.player.number=data.number;
				$scope.player.joining_date=new Date(data.joining_date);
				$scope.player.leaving_date=new Date(data.leaving_date);
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

    $scope.submitPlayer = function() {
    	console.log($scope.player);
    	if ($scope.playerId){
    		statFactory.updateTeamPlayer($scope.selectedTeam._id, $scope.playerId, $scope.player)
    			.then(function(){ $uibModalInstance.close('Player saved'); },
    				function(error) {console.log(error)});
    	} else {
        	statFactory.addTeamPlayer($scope.selectedTeam._id, $scope.player)
        		.then(function(){ $uibModalInstance.close('Player saved'); },
        			function(error) {console.log(error)});
        }
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }

}]);