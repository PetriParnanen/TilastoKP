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
	.factory('statFactory', ['$http', '$window', 'userToken', '$q', function($http, $window, userToken, $q){

	var statFactory = {};
	var apiServer = 'http://localhost:3000/api';

	// topic is used to create url, method is connection method
	// data is a json message that have to include fields to generate url and data part if something needs to be send to api
	statFactory.fetchApiData = function(topic, method, data) {
		if (!topic) { return $q.reject('DB.ERR.INCORRECTFETCHREQUEST') };
		if (!method) { return $q.reject('DB.ERR.INCORRECTFETCHREQUEST') };

		var token = userToken.getToken();
		var url = apiServer;
		switch(topic) {
			case 'sports':
				url += '/sportlist';
				break;
			case 'team':
				url += '/teamlist';
				break;
			case 'teamId':
				if (!('teamId' in data)) { return $q.reject('DB.ERR.INCORRECTFETCHREQUEST') };
				url += '/teamlist/' + data.teamId;
				break;
			case 'teamPlayer':
				if (!('teamId' in data)) { return $q.reject('DB.ERR.INCORRECTFETCHREQUEST') };
				url += '/playerlist/team/' + data.teamId;
				break;
			case 'teamPlayerId':
				if (!('teamId' in data)) { return $q.reject('DB.ERR.INCORRECTFETCHREQUEST') };
				if (!('playerId' in data)) { return $q.reject('DB.ERR.INCORRECTFETCHREQUEST') };
				url += '/playerlist/team/' + data.teamId + '/' + data.playerId;
				break;
			case 'sportEvent':
				if (!('sportId' in data)) { return $q.reject('DB.ERR.INCORRECTFETCHREQUEST') };
				url += '/sportlist/event/' + data.sportId;
				break;
			case 'teamMatch':
				if (!('teamId' in data)) { return $q.reject('DB.ERR.INCORRECTFETCHREQUEST') };
				url += '/matchlist/team/' + data.teamId;
				break;
			case 'teamMatchId':
				if (!('teamId' in data)) { return $q.reject('DB.ERR.INCORRECTFETCHREQUEST') };
				if (!('matchId' in data)) { return $q.reject('DB.ERR.INCORRECTFETCHREQUEST') };
				url += '/matchlist/team/' + data.teamId + '/' + data.matchId;
				break;
			default:
				return $q.reject('DB.ERR.INCORRECTFETCHREQUEST');
				break;
		};

		var http_request = {};

		http_request['url'] = url;
		http_request['method'] = method;
		http_request['headers'] = {'x-access-token': token};
		if (data && data.data) {
			http_request['data'] = data.data;
		};
		return $http(http_request);
	};

	return statFactory;
}]);