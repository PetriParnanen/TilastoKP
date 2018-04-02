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

	var statFactory = {};

	var apiServer = 'http://localhost:3000/api';

	statFactory.getSports = function() {
		return $http.get(apiServer + "/sportlist");
	};

	statFactory.getTeams = function() {
		return $http.get(apiServer + "/teamlist");
	};

	statFactory.getTeam = function(id) {
		return $http.get(apiServer + "/teamlist/" + id);
	};

	statFactory.addTeam = function(teamData) {
		return $http.post(apiServer + "/teamlist", teamData);
	};

	statFactory.updateTeam = function(id, teamData) {
		return $http.put(apiServer + "/teamlist/" + id, teamData);
	};

	statFactory.removeTeam = function(id){
		return $http.delete(apiServer + "/teamlist/" + id);
	}

	statFactory.getTeamPlayers = function(id) {
		return $http.get(apiServer + "/playerlist/team/" + id);
	};

	statFactory.getTeamPlayer = function(teamId, playerId) {
		return $http.get(apiServer + "/playerlist/team/" + teamId + "/" + playerId);
	};

	statFactory.updateTeamPlayer = function(teamId, playerId, playerData) {
		return $http.put(apiServer + "/playerlist/team/" + teamId + "/" + playerId, playerData);
	};

	statFactory.addTeamPlayer = function(id, playerData) {
		return $http.post(apiServer + "/playerlist/team/" + id, playerData);
	};

	statFactory.removeTeamPlayer = function(teamId, playerId) {
		return $http.delete(apiServer + "/playerlist/team/" + teamId + "/" + playerId);
	};

	statFactory.getSportEvents = function(sportId) {
		return $http.get(apiServer + "/sportlist/event/" + sportId);
	};

	statFactory.addMatch = function(teamId, matchData) {
		return $http.post(apiServer + "/matchlist/team/" + teamId, matchData);
	};

	statFactory.getTeamMatches = function(teamId) {
		return $http.get(apiServer + "/matchlist/team/" + teamId);
	};

	statFactory.getTeamMatch = function(teamId, matchId) {
		return $http.get(apiServer + "/matchlist/team/" + teamId + "/" + matchId);
	};

	return statFactory;
}]);