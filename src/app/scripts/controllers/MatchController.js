angular.module('MatchModule', []).controller('MatchController', 
	['$scope', 'statFactory', '$uibModal', '$route',
		function($scope, statFactory, $uibModal, $route){

	statFactory.getTeamPlayers($scope.selectedTeam._id)
    	.then(function(data) {
        	$scope.teamPlayers = data;
		}, function(error){
            console.log("ERR:"+error);
        });

    //datepicker stuff
	$scope.today = function(){
		$scope.jdate = new Date();
	};
	$scope.today();

	$scope.matchDayOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	$scope.open2 = function() {
		$scope.popup2.opened = true;
	};

	$scope.popup2 = {
		opened: false
	};
	//end of datepicker stuff

}]);