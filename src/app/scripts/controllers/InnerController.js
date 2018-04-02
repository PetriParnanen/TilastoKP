angular.module('InnerModule', []).controller('InnerController', 
	['$scope', 'statFactory', '$uibModal', '$route',
		function($scope, statFactory, $uibModal, $route){
	
	getTeams();

	function getTeams(teamId){
		statFactory.getTeams()
			.then(function(data) {
				console.log(data);
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
				console.log("Could not load teams");
		});
	};

	$scope.changeContent = function() {
		$scope.$broadcast("changeContent");
	};

	$scope.$on("updateTeams", function(event, data) {
		getTeams(data);
	});

	$scope.logout = function() {
		$scope.$emit('LoggingOut');
	}

	$scope.addTeam = function () {
		var modalInstance = $uibModal.open({
            templateUrl: './views/addTeamPopup.html',
            controller: 'SaveTeamController',
            scope: $scope,
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