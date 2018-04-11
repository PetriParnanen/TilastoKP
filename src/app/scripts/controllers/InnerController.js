angular.module('InnerModule', []).controller('InnerController', 
	['$scope', 'statFactory', '$uibModal', '$route',
		function($scope, statFactory, $uibModal, $route){
	
	$scope.message = '';
	$scope.userStatus = '';
	//$scope.innerMesStatus = '';
	//$scope.innerMessage = '';
	getTeams();

	// fething all teams for user
	function getTeams(teamId){
		statFactory.fetchApiData('team', 'get')
			.then(function(data) {
				$scope.teams = data.data;
				if (teamId) {
					var m = data.data.length;
					for(var i=0;i<m;i++){
						if (teamId.selected == data.data[i]._id){
							$scope.selectedTeam = data.data[i];
						}
					}
				} else {
					$scope.selectedTeam = data.data[0];
				}
			}, function(error){
				$scope.innerMesStatus='error';
				$scope.innerMessage='DB.ERR.DBERROR';
		});
	};

	// tell other controllers that they need to chance data
	$scope.changeContent = function() {
		$scope.innerMesStatus = '';
		$scope.innerMessage = '';
		$scope.$broadcast("changeContent");
	};

	// other controllers will tell when team data need updating
	$scope.$on("updateTeams", function(event, data) {
		getTeams(data);
	});

	// logout scream
	$scope.logout = function() {
		$scope.$emit('LoggingOut');
	};

	// print message out if needed
	$scope.$on("showInnerMessage", function(event, data){
		if (data){
			$scope.innerMessage = data.message;
			$scope.innerMesStatus = data.status;
		} else {
			$scope.innerMessage = '';
			$scope.innerMesStatus = '';
		}
	});

	// create new team for user
	$scope.addTeam = function () {
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
                	return 'INDEX.CREATE_TEAM';
                },
                teamId: function() {
                	return false;
                }
            }
        });

		modalInstance.result.then(function (selectedItem) {
			$scope.selected=selectedItem;
            getTeams(selectedItem);
        }, function () {
            console.log('Dismissed');
        });
    };

}]);