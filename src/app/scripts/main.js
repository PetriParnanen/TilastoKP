var app = angular.module('matchStatisticsApp',
            ['ngRoute', 'ui.bootstrap', 'MainModule','TeamModule','SaveTeamModule','PlayerModule',
                'MatchModule', 'LiveMatchModule', 'RaportModule', 'RaportMatchModule', 'StatApiFactory']);

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);
 
app.config(['$routeProvider',
  function($routeProvider) {
  $routeProvider.
    when('/team', {
        templateUrl: 'views/team.html',
        controller: 'TeamController'
    }).
    when('/start_match', {
        templateUrl: 'views/start_match.html',
        controller: 'MatchController'
    }).
    when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'RaportController'
    }).
    otherwise({
    redirectTo: '/'
    });

}]);
