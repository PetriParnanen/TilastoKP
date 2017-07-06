var app = angular.module('matchStatisticsApp',
                            ['ngRoute','TeamModule','StatFactory']);

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);
 
app.config(['$routeProvider',
  function($routeProvider) {
  $routeProvider.when('/team', {
        templateUrl: 'views/team.html',
        controller: 'TeamController'
    }).
  when('/player_list', {
        templateUrl: 'views/player_list.html',
        controller: 'PlayerController'
    }).
    when('/start_match', {
        templateUrl: 'views/start_match.html',
        controller: 'MatchController'
    }).
    when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'MatchController'
    }).
    otherwise({
    redirectTo: '/'
    });

}]);
