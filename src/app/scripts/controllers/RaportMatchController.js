angular.module('RaportMatchModule', []).controller('RaportMatchController', 
	['$scope', 'statFactory', '$uibModalInstance', 'modalTitle', 'matchId', 'sportId', 'sportName', 'teamId', 'matchData', '$filter',
	function($scope, statFactory, $uibModalInstance, modalTitle, matchId, sportId, sportName, teamId, matchData, $filter){

	$scope.matchId = matchId;
	$scope.sportId = sportId;
	$scope.sportName = sportName;
	$scope.teamId = teamId;
	$scope.matchData = matchData;

	// fetch events for sport
	statFactory.fetchApiData('sportEvent','get', {'sportId':$scope.sportId})
		.then(function(data){
			$scope.sportEvents = data.data;
		}, function(error){
				console.log(error);
		}
	);

	$scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
    
}]);