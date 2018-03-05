angular.module('RaportModule', []).controller('RaportController', 
	['$scope', 'statFactory', '$uibModal', '$route',
		function($scope, statFactory, $uibModal, $route){

	refreshMatches();

	function refreshMatches(){
		statFactory.getTeamMatches($scope.selectedTeam._id)
			.then(function(data) {
				$scope.matches = data;
			}, function(error){
				console.log("ERR "+error);
			}
		)
	};

	$scope.$on("changeContent", function() {
		refreshMatches();
	});

	$scope.openMatch = function(matchId) {
		var matchData = {};
		statFactory.getTeamPlayers($scope.selectedTeam._id)
    		.then(function(players) {
        		$scope.teamPlayers = players;
        		statFactory.getTeamMatch($scope.teamId, matchId)
					.then(function(match){
						matchData = match;
						for(var i = 0; i < matchData.players.length; i++){
							for(var j = 0; j < $scope.teamPlayers.length; j++){
								if ($scope.teamPlayers[j]._id == matchData.players[i].player_id){
									matchData.players[i].nickname = $scope.teamPlayers[j].nickname;
									matchData.players[i].number = $scope.teamPlayers[j].number;
									break;
								}
							}
						}

						var modalInstance = $uibModal.open({
            				templateUrl: './views/viewMatchPopup.html',
            				controller: 'RaportMatchController',
           		 			scope: $scope,
    	        			resolve: {
        	       				modalTitle: function() {
            	    				return 'Ottelun tilastot';
               		 			},
                				matchId: function() {
                					return matchId;
                				},
        	        			sportId: function() {
            	    				return $scope.selectedTeam.sportId._id;
                				},
                				sportName: function() {
                					return $scope.selectedTeam.sportId.name;
                				},
                				teamId: function() {
                    				return $scope.selectedTeam._id;
                				},
           		     			matchData: function() {
                					return matchData;
                				}
            				}
        				});

						modalInstance.result.then(function (selectedItem) {
            				console.log('Closed');
        				}, function () {
           	 				console.log('Dismissed');
        				});

					}, function(error){
						console.log("Error "+error);
					}
				);
			}, function(error){
          	  console.log("ERR:"+error);
        	}
    	);
	};

}]);