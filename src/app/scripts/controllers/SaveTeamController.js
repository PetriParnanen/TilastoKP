angular.module('SaveTeamModule', []).controller('SaveTeamController',
	['$scope', 'statFactory', '$uibModalInstance', 'saveTeam', 'modalTitle', 'teamId',
	function($scope, statFactory, $uibModalInstance, saveTeam, modalTitle, teamId){
	
	$scope.modalTitle = modalTitle;
	$scope.sportId = "";
	$scope.teamId = teamId;
	$scope.teamPopupMessage = "";

	// if team id exists fetch data for that team
	if(teamId){
		statFactory.fetchApiData('teamId', 'get', {'teamId': teamId})
			.then(function(data) {
				$scope.teamPopupMessage = "";
				$scope.team = {};
				$scope.team.name = data.data.name;
				$scope.team.sportText = data.data.sportId.name;
			}, function(error){
				$scope.teamPopupMessage = 'DB.ERR.NOTEAM';
				console.log("Could not load team");
		});
	};

	// get all existing sports
	getSports();

	function getSports(){
		statFactory.fetchApiData('sports', 'get')
			.then(function(data) {
				$scope.teamPopupMessage = "";
				$scope.sports = data.data;
				if ($scope.sportId){
					console.log("setting dropdown");
				} else {
					$scope.selectedSport = data.data[0];
				}
			}, function(error){
				$scope.teamPopupMessage = 'DB.ERR.NOSPORTS';
				console.log("Could not load sports");
		});
	};

	//form savings
    $scope.form = {};

    // save team data. I team id given then update else create new
    $scope.submitTeam = function() {
    	$scope.team.sport = $scope.team.selectedSport._id;
    	if ($scope.team == null || $scope.team.name == null || $scope.team.name == '' || 
    		(!($scope.teamId) && $scope.team.selectedSport == null)){
    		$scope.teamPopupMessage = 'TEAM.ERR.NAMESPORTMANDATORY';
    	} else {
    		$scope.teamPopupMessage = "";
    		if ($scope.teamId){
    			statFactory.fetchApiData('teamId', 'put', {'teamId': $scope.teamId, 'data':$scope.team})
    				.then(
    					function(responce) { 
    						$uibModalInstance.close({"selected":responce.data._id});
    						$scope.$emit("showInnerMessage", {status: 'success', message: 'TEAM.SAVESUCCESS' }); 
    					}, 
    					function(error) { $scope.teamPopupMessage = 'DB.ERR.NOSAVE'; }
    				);
    		} else {
    			statFactory.fetchApiData('team', 'post', {'data':$scope.team})
        			.then(
        				function(responce) { 
        					$scope.$emit("showInnerMessage", {status: 'success', message: 'TEAM.SAVESUCCESS' });
        					$uibModalInstance.close({"selected":responce.data._id});
        				}, 
        				function(error) { $scope.teamPopupMessage = 'DB.ERR.NOSAVE'; }
        			);
      	  };
      	};
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}]);