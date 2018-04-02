angular.module('SaveTeamModule', []).controller('SaveTeamController',
	['$scope', 'statFactory', '$uibModalInstance', 'saveTeam', 'modalTitle', 'teamId',
	function($scope, statFactory, $uibModalInstance, saveTeam, modalTitle, teamId){
	
	$scope.modalTitle = modalTitle;
	$scope.sportId = "";
	$scope.teamId = teamId;

	// if team id exists fetch data for that team
	if(teamId){
		statFactory.getTeam(teamId)
			.then(function(data) {
				$scope.team = {};
				$scope.team.name = data.data.name;
				$scope.team.sportText = data.data.sportId.name;
			}, function(error){
				console.log("Could not load team");
		});
	};

	// get all existing sports
	getSports();

	function getSports(){
		statFactory.getSports()
			.then(function(data) {
				$scope.sports = data.data;
				if ($scope.sportId){
					console.log("setting dropdown");
				} else {
					$scope.selectedSport = data.data[0];
				}
			}, function(error){
				console.log("Could not load sports");
		});
	};

	//form savings
    $scope.form = {};

    // save team data. I team id given then update else create new
    $scope.submitTeam = function() {
    	if ($scope.teamId){
    		statFactory.updateTeam($scope.teamId, $scope.team)
    			.then(function(responce) { $uibModalInstance.close({"selected":responce.data._id}); }, 
    				function(error) {console.log(error)});
    	} else {
        	statFactory.addTeam($scope.team)
        		.then(function(responce) { $uibModalInstance.close({"selected":responce.data._id}); }, 
        			function(error) {console.log(error)});
        }; 
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}]);