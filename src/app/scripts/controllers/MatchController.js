angular.module('MatchModule', []).controller('MatchController', 
	['$scope', 'statFactory', '$uibModal', '$route',
		function($scope, statFactory, $uibModal, $route){

    refreshMatchPlayers();

    // fetches teams players
	function refreshMatchPlayers(){
        statFactory.getTeamPlayers($scope.selectedTeam._id)
    	   .then(function(data) {
                $scope.teamPlayers = data.data;
	       }, function(error){
                console.log("ERR:"+error);
        });
    }

    // if in inner team is chanced then data on this page need to chance
    $scope.$on("changeContent", function() {
        refreshMatchPlayers();
    });

    $scope.match = {
    	players:{}
    };

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

	// Start game
	$scope.startGame = function () {
        console.log($scope.selectedTeam);
		var modalInstance = $uibModal.open({
            templateUrl: './views/matchPopup.html',
            controller: 'LiveMatchController',
            scope: $scope,
            resolve: {
                saveGame: function () {
                    return $scope.saveGame;
                },
                modalTitle: function() {
                	return 'Tallenna ottelu';
                },
                matchData: function() {
                	return $scope.match;
                },
                sportId: function() {
                	return $scope.selectedTeam.sportId._id;
                },
                sportName: function() {
                    return $scope.selectedTeam.sportId.name;
                },
                teamId: function() {
                    return $scope.selectedTeam._id
                }
            }
        });

		modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            console.log('Dismissed');
        });
    };

}]);