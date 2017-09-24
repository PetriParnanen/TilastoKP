angular.module('MainModule', []).controller('MainController', 
	['$scope', 'statFactory', '$uibModal', '$route',
		function($scope, statFactory, $uibModal, $route){
	
	getTeams();

	function getTeams(teamId){
		statFactory.getTeams()
			.then(function(data) {
				$scope.teams = data;
				if (teamId) {
					var m = data.length;
					for(var i=0;i<m;i++){
						if (teamId.selected == data[i]._id){
							$scope.selectedTeam = data[i];
						}
					}
				} else {
					$scope.selectedTeam = data[0];
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
                	return 'Luo uusi joukkue';
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