angular.module('TeamModule', []).controller('TeamController', 
    ['$scope', 'statFactory', '$uibModal',  '$route', '$window',
        function($scope,statFactory,$uibModal,$route, $window){

    refreshPlayers();
    $scope.$emit('showInnerMessage');

    // refreshes team list
	function refreshPlayers(){
        statFactory.fetchApiData('teamPlayer', 'get', { 'teamId':$scope.selectedTeam._id })
            .then(function(data) {
                $scope.players = data.data;
		    }, function(error){
                $scope.$emit('showInnerMessage', {status: 'error', message: 'DB.ERR.DBERROR'});
            }
        );
	};

    // if team changed in inner controller, refresh player list
	$scope.$on("changeContent", function() {
		refreshPlayers();
	});

    // Add new player to team
	$scope.addPlayer = function () {
		var modalInstance = $uibModal.open({
            templateUrl: './views/addPlayerPopup.html',
            controller: 'PlayerController',
            scope: $scope,
            backdrop: 'static',
            keyboard: false,
            resolve: {
                savePlayer: function () {
                    return $scope.savePlayer;
                },
                modalTitle: function() {
                	return 'TEAM.ADD_PLAYER';
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
            backdrop: 'static',
            keyboard: false,
            resolve: {
                saveTeam: function () {
                    return $scope.saveTeam;
                },
                modalTitle: function() {
                    return 'TEAM.EDIT_TEAM';
                },
                teamId: function() {
                    return $scope.selectedTeam._id;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
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
            backdrop: 'static',
            keyboard: false,
            resolve: {
                savePlayer: function () {
                    return $scope.savePlayer;
                },
                modalTitle: function() {
                    return 'TEAM.EDIT_PLAYER';
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
            refreshPlayers();
        }, function () {
            console.log('Dismissed');
        });
    };

    //remove team
    $scope.removeTeam = function () {
        statFactory.fetchApiData('teamId', 'delete', { 'teamId':$scope.selectedTeam._id })
            .then(function(){
                $scope.$emit('showInnerMessage', {status: 'success', message: 'TEAM.REMOVESUCCESS'});
                $window.location.href = "/";
            }, function(error){
                console.log("Team removal failed");
                $scope.$emit('showInnerMessage', {status: 'error', message: 'DB.ERR.DBERROR'});
            });
    }

    //remove player
    $scope.removePlayer = function (playerId) {
        statFactory.fetchApiData('teamPlayerId', 'delete', { 'teamId':$scope.selectedTeam._id, 'playerId': playerId })
            .then(function(){
                $scope.$emit('showInnerMessage', {status: 'success', message: 'PLAYER.REMOVESUCCESS'});
                refreshPlayers();
            }, function() {
                $scope.$emit('showInnerMessage', {status: 'error', message: 'DB.ERR.DBERROR'});
                console.log("Player removal failed");
            });
    }

}]);
	