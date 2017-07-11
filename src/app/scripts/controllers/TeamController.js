angular.module('TeamModule', []).controller('TeamController', function($scope,TeamItem,$filter){	    
		//var items = TeamFactory.getTeams();
		var items = TeamItem.query();
	    $scope.teams = items;
	    console.log($scope.teams);

	   	
	   	// --- HUOM tämä filtteri ei vielä toimi. Muuttujat keturallaan.
	    // Näin saadaan valikon ensimmäinen valinta esivalituksi orderBy-filterin mukaisessa järjestyksessä. 
	    // Jos filtteri on viewissa eikä tässä, esivalituksi tulee järjestelemättömän listan ensimmäinen valinta.
	    //$scope.sortedTeams = $filter('orderBy')($scope.sortedTeams,'name');
	    // ---
	    
	    // HUOM Tämä ei nyt toimi kun vaihdettiin käyttöön StatApiFactory
	    // Esivalitaan listan ensimmäinen vaihtoehto.	    
	    $scope.selectedTeam = items[0];

	    console.log('items[0]: ' + items[0]);

		// TODO:
		// Valitun joukkueen id:n säilyminen muihin vieweihin ja sieltä takaisin niin, että valinta säilyy joukkuevalikossa.

});