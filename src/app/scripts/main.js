var app = angular.module('matchStatisticsApp',
            ['ngRoute', 'ui.bootstrap', 'MainModule','TeamModule','SaveTeamModule','PlayerModule',
                'MatchModule', 'LiveMatchModule', 'RaportModule', 'RaportMatchModule', 'StatApiFactory',
                'pascalprecht.translate']);

app.config(['$locationProvider', '$translateProvider', function($locationProvider, $translateProvider) {
    $locationProvider.hashPrefix('');

    $translateProvider.registerAvailableLanguageKeys(['fi','en']);
    $translateProvider.useStaticFilesLoader({
        prefix: "resource/locale_",
        suffix: ".json"
    });
    $translateProvider.preferredLanguage("FI");
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
