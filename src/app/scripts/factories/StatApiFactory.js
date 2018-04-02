angular.module('StatApiFactory', [])
	.config(['$httpProvider', function($httpProvider) {
		// seems like angularjs does cache it's get reguests. Need to overwrite that
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
	.factory('statFactory', ['$http', '$window', 'userToken', function($http, $window, userToken){

	var statFactory = {};
	var apiServer = 'http://localhost:3000/api';

	// get all sports
	statFactory.getSports = function() {
		var token = userToken.getToken();
		return $http({ 
			method: 'get',
			url: apiServer + '/sportlist',
			headers: {
				'x-access-token': token
			}
		});
	};

	// get all users teams
	statFactory.getTeams = function() {
		var token = userToken.getToken();
		return $http({
			method: 'get',
			url: apiServer + '/teamlist',
			headers: {
				'x-access-token': token
			}
		});
	};

	// get one team info
	statFactory.getTeam = function(id) {
		var token = userToken.getToken();
		return $http({
			method: 'get',
			url: apiServer + '/teamlist/' + id,
			headers: {
				'x-access-token': token
			}
		});
	};

	// Add team to user
	statFactory.addTeam = function(teamData) {
		var token = userToken.getToken();
		return $http({
			method: 'post',
			url: apiServer + '/teamlist',
			headers: {
				'x-access-token': token
			},
			data: teamData
		});
	};

	// update teams info
	statFactory.updateTeam = function(id, teamData) {
		var token = userToken.getToken();
		return $http({
			method: 'put',
			url: apiServer + '/teamlist/' + id,
			headers: {
				'x-access-token': token
			},
			data: teamData
		});
	};

	// remove team (does remove from database)
	statFactory.removeTeam = function(id){
		var token = userToken.getToken();
		return $http({
			method: 'delete',
			url: apiServer + '/teamlist/' + id,
			headers: {
				'x-access-token': token
			}
		});
	};

	// get all players on team
	statFactory.getTeamPlayers = function(id) {
		var token = userToken.getToken();
		return $http({
			method: 'get',
			url: apiServer + '/playerlist/team/' + id,
			headers: {
				'x-access-token': token
			}
		});
	};

	// get one players ingo (need to know the team he is in)
	statFactory.getTeamPlayer = function(teamId, playerId) {
		var token = userToken.getToken();
		return $http({
			method: 'get',
			url: apiServer + '/playerlist/team/' + teamId + '/' + playerId,
			headers: {
				'x-access-token': token
			}
		});
	};

	// updates players data
	statFactory.updateTeamPlayer = function(teamId, playerId, playerData) {
		var token = userToken.getToken();
		return $http({
			method: 'put',
			url: apiServer + '/playerlist/team/' + teamId + '/' + playerId,
			headers: {
				'x-access-token': token
			},
			data: playerData
		});
	};

	// add player to team
	statFactory.addTeamPlayer = function(id, playerData) {
		var token = userToken.getToken();
		return $http({
			method: 'post',
			url: apiServer + '/playerlist/team/' + id,
			headers: {
				'x-access-token': token
			},
			data: playerData
		});
	};

	//remove player from team (and delete's from database)
	statFactory.removeTeamPlayer = function(teamId, playerId) {
		var token = userToken.getToken();
		return $http({
			method: 'delete',
			url: apiServer + '/playerlist/team/' + teamId + '/' + playerId,
			headers: {
				'x-access-token': token
			}
		});
	};

	// get all events tied to a sport
	statFactory.getSportEvents = function(sportId) {
		var token = userToken.getToken();
		return $http({
			method: 'get',
			url: apiServer + '/sportlist/event/' + sportId,
			headers: {
				'x-access-token': token
			}
		});
	};

	// add new match
	statFactory.addMatch = function(teamId, matchData) {
		var token = userToken.getToken();
		return $http({
			method: 'post',
			url: apiServer + '/matchlist/team/' + teamId,
			headers: {
				'x-access-token': token
			},
			data: matchData
		});
	};

	// get all matches for a team
	statFactory.getTeamMatches = function(teamId) {
		var token = userToken.getToken();
		return $http({
			method: 'get',
			url: apiServer + '/matchlist/team/' + teamId,
			headers: {
				'x-access-token': token
			}
		});
	};

	// get one match for team
	statFactory.getTeamMatch = function(teamId, matchId) {
		var token = userToken.getToken();
		return $http({
			method: 'get',
			url: apiServer + '/matchlist/team/' + teamId + '/' + matchId,
			headers: {
				'x-access-token': token
			}
		});
	};

	return statFactory;
}]);