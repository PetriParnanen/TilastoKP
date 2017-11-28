angular.module('RaportMatchModule', []).controller('RaportMatchController', 
	['$scope', 'statFactory', '$uibModalInstance', 'modalTitle', 'matchId', 'sportId', 'teamId', 'matchData',
	function($scope, statFactory, $uibModalInstance, modalTitle, matchId, sportId, teamId, matchData){

	$scope.matchId = matchId;
	$scope.sportId = sportId;
	$scope.teamId = teamId;
	$scope.matchData = matchData;

	statFactory.getSportEvents($scope.sportId)
		.then(function(data){
			$scope.sportEvents = data;
		}, function(error){
				console.log(error);
		}
	);

}]);