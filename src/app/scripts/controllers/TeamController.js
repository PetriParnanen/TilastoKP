angular.module('TeamModule', []).controller('TeamController', 
    ['$scope', 'statFactory', '$uibModal',  '$route',
        function($scope,statFactory,$uibModal,$route){

    refreshPlayers();

	function refreshPlayers(){
		statFactory.getTeamPlayers($scope.selectedTeam._id)
            .then(function(data) {
                $scope.players = data;
		}, function(error){
            console.log("ERR:"+error);
        });
	};

	$scope.$on("changeContent", function() {
		refreshPlayers();
	});

    // Add new player
	$scope.addPlayer = function () {
		var modalInstance = $uibModal.open({
            templateUrl: './views/addPlayerPopup.html',
            controller: 'PlayerController',
            scope: $scope,
            resolve: {
                savePlayer: function () {
                    return $scope.savePlayer;
                },
                modalTitle: function() {
                	return 'Luo uusi pelaaja';
                },
                teamId: function() {
                	return $scope.selectedTeam._id;
                },
                playerId: function() {
                    return false;
                }
            }
        });

		modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
            refreshPlayers();
        }, function () {
            console.log('Dismissed');
        });
    };

    //Rename team name
    $scope.editTeam = function () {
        var modalInstance = $uibModal.open({
            templateUrl: './views/addTeamPopup.html',
            controller: 'SaveTeamController',
            scope: $scope,
            resolve: {
                saveTeam: function () {
                    return $scope.saveTeam;
                },
                modalTitle: function() {
                    return 'Muuta joukkueen nimi';
                },
                teamId: function() {
                    return $scope.selectedTeam._id;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected=selectedItem;
            $scope.$emit("updateTeams", selectedItem); // have to update current id
        }, function () {
            console.log('Dismissed');
        });
    };

    // edit player
    $scope.editPlayer = function (playerId) {
        var modalInstance = $uibModal.open({
            templateUrl: './views/addPlayerPopup.html',
            controller: 'PlayerController',
            scope: $scope,
            resolve: {
                savePlayer: function () {
                    return $scope.savePlayer;
                },
                modalTitle: function() {
                    return 'Luo uusi pelaaja';
                },
                teamId: function() {
                    return $scope.selectedTeam._id;
                },
                playerId: function() {
                    return playerId;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
            console.log($scope.selected);
            refreshPlayers();
        }, function () {
            console.log('Dismissed');
        });
    };

}]);
	