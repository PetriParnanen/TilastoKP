angular.module('SaveTeamModule', []).controller('SaveTeamController',
	['$scope', 'statFactory', '$uibModalInstance', 'saveTeam', 'modalTitle', 'teamId',
	function($scope, statFactory, $uibModalInstance, saveTeam, modalTitle, teamId){
	
	$scope.modalTitle = modalTitle;
	$scope.sportId = "";
	$scope.teamId = teamId;

	if(teamId){
		statFactory.getTeam(teamId)
			.then(function(data) {
				$scope.team = {};
				$scope.team.name = data.name;
				$scope.team.sportText = data.sportId.name;
			}, function(error){
				console.log("Could not load team");
		});
	};

	getSports();

	function getSports(){
		statFactory.getSports()
			.then(function(data) {
				$scope.sports = data;
				if ($scope.sportId){
					console.log("setting dropdowan");
				} else {
					$scope.selectedSport = data[0];
				}
			}, function(error){
				console.log("Could not load sports");
		});
	};

	//form savings
    $scope.form = {};

    $scope.submitTeam = function() {
    	if ($scope.teamId){
    		statFactory.updateTeam($scope.teamId, $scope.team)
    			.then(function(responce) { $uibModalInstance.close({"selected":responce._id}); }, 
    				function(error) {console.log(error)});
    	} else {
        	statFactory.addTeam($scope.team)
        		.then(function(responce) { $uibModalInstance.close({"selected":responce._id}); }, 
        			function(error) {console.log(error)});
        }; 
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}]);