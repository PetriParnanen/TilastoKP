angular.module('StatApiFactory', [])
	.config(['$httpProvider', function($httpProvider) {
		if (!$httpProvider.defaults.headers.get) {
       		$httpProvider.defaults.headers.get = {};    
    	}    

    	//disable IE ajax request caching
    	$httpProvider.defaults.headers.common['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    	// no cache no matter what
    	$httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
    	$httpProvider.defaults.headers.common['Pragma'] = 'no-cache';
    	$httpProvider.defaults.headers.common['Content-type'] = 'application/json';
	}])
	.factory('statFactory', ['$http', function($http){

	var apiServer = 'http://localhost:3000/api';
	var statFactory = {};

	statFactory.getSports = function() {
		return $http.get(apiServer + "/sportlist")
			.then(function(response){ return response.data; }, function(error){ console.log("GS ERROR " + error)});
	};

	statFactory.getTeams = function() {
		return $http.get(apiServer + "/teamlist")
			.then(function(response){ return response.data; }, function(error){ console.log("GTs ERROR " + error)});
	};

	statFactory.getTeam = function(id) {
		return $http.get(apiServer + "/teamlist/" + id)
			.then(function(response){ return response.data; }, function(error){ console.log("GT ERROR " + error)});
	};

	statFactory.addTeam = function(teamData) {
		return $http.post(apiServer + "/teamlist", teamData)
			.then(function(response){ return response.data; }, function(error){ console.log("AT ERROR " + error)});
	};

	statFactory.updateTeam = function(id, teamData) {
		return $http.put(apiServer + "/teamlist/" + id, teamData)
			.then(function(response){ return response.data; }, function(error){ console.log("UT ERROR " + error)});
	};

	statFactory.removeTeam = function(id){
		return $http.delete(apiServer + "/teamlist/" + id)
			.then(function(response){ return response.data; }, function(error){ console.log("RD ERROR " + error)});
	}

	statFactory.getTeamPlayers = function(id) {
		return $http.get(apiServer + "/playerlist/team/" + id)
			.then(function(response){ return response.data; }, function(error){ console.log("GTPs ERROR " + error)});
	};

	statFactory.getTeamPlayer = function(teamId, playerId) {
		return $http.get(apiServer + "/playerlist/team/" + teamId + "/" + playerId)
			.then(function(response){ return response.data; }, function(error){ console.log("GTP ERROR " + error)});
	};

	statFactory.updateTeamPlayer = function(teamId, playerId, playerData) {
		return $http.put(apiServer + "/playerlist/team/" + teamId + "/" + playerId, playerData)
			.then(function(response){ return response.data; }, function(error){ console.log("UTP ERROR "+ error)});
	};

	statFactory.addTeamPlayer = function(id, playerData) {
		return $http.post(apiServer + "/playerlist/team/" + id, playerData)
			.then(function(response){ return response.data; }, function(error){ console.log("ATP ERROR " + error)});
	};

	statFactory.removeTeamPlayer = function(teamId, playerId) {
		return $http.delete(apiServer + "/playerlist/team/" + teamId + "/" + playerId)
			.then(function(response){ return response.data; }, function(error){ console.log("DTP ERROR " + error)});
	}

	return statFactory;
}]);