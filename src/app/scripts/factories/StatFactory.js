angular.module('StatFactory', []).factory('TeamFactory', function(){


	var factory={};

// joukkueet
teams = [
	{id:1, name:"Skuuppi joukkue"},
	{id:2, name:"Kikka joukkue"}
];

// joukkue funktiot, näistä vain haut nyt alkuun käytössä
	factory.getTeams = function() {
		return teams;
	};

//yksittäinen joukkue
	factory.getTeam = function(id){
		var l = teams.length;
		for (var i = 0; i < l; i++) {
			if ( id == teams[i].id) {
				return teams[i];
			}
		}
		return {};
	};

//Lisää joukkue
	factory.addTeam = function(newTeam) {
		console.log("New team:" + newTeam);
		teams.push(newTeam);
	};

// Listaa lajin tapahtumat, resourcen tullessa haku ehdossa on mukana laji-id
var events = [
	{id:1, desc:"Onnistunut 2P heitto", abbr:"O2P", order:"1"},
	{id:2, desc:"2P heittoyritys", abbr:"H2P", order:"5"},
	{id:3, desc:"Onnistunut 3P heitto", abbr:"O3P", order:"10"},
	{id:4, desc:"3P heittoyritys", abbr:"H3P", order:"15"},
	{id:5, desc:"Onnistunut vapaaheitto", abbr:"O1P", order:"20"},
	{id:6, desc:"Vapaaheitto yritys", abbr:"H1P", order:"25"},
	{id:7, desc:"Hyökkäys levypallo", abbr:"HL", order:"30"},
	{id:8, desc:"Puolustus levypallo", abbr:"PL", order:"35"},
	{id:9, desc:"Levypallot yhteensä", abbr:"LEV", order:"40",sum:"@7 + @8"},
	{id:10, desc:"Syötöt", abbr:"S",order:"45"},
	{id:11, desc:"Menetykset", abbr:"M", order:"50"},
	{id:12, desc:"Riistot", abbr:"R", order:"55"},
	{id:13, desc:"Torjunnat", abbr:"T", order:"60"},
	{id:14, desc:"Virheet", abbr:"V", order:"65"},
	{id:15, desc:"Pisteet", abbr:"PIST", order:"70",sum:"@1*2+@3*3+@5*1"}
];

// tapahtumien funktiot
// hakee kaikki
	factory.getEvents = function() {
		return events;
	};

//Yksittäinen tapahtuma
	factory.getEvent = function(id){
		var l = events.length;
		for (var i = 0; i < l; i++) {
			if ( id == events[i].id) {
				return events[i];
			}
		}
		return {};
	};

//uusi tapahtuma
	factory.addEvent = function(newEvent) {
		console.log("New event:" + newEvent);
		events.push(newEvent);
	};

// Listaa kaikki pelaajat

var players = [ 
	{id: 1, fname:"kalle", lname:"kalle"},
	{id: 2, fname:"pekka", lname:"piru"},
	{id: 3, fname:"timo", lname:"juolevi"},
	{id: 4, fname:"samu", lname:"sirkka"},
	{id: 5, fname:"veikko", lname:"hakulinen"},
	{id: 6, fname:"pekka", lname:"saapuvi"},
	{id: 7, fname:"simon", lname:"says"},
	{id: 8, fname:"reiska", lname:"ripeä"},
	{id: 9, fname:"timothy", lname:"dalton"},
	{id: 10, fname:"repo", lname:"man"},
	{id: 11, fname:"rep", lname:"man"}
];

// pelaaja funktiot
// hakee kaikki
	factory.getPlayers = function() {
		return players;
	};

//Yksittäinen pelaaja
	factory.getPlayer = function(id){
		var l = players.length;
		for (var i = 0; i < l; i++) {
			if ( id == players[i].id) {
				return players[i];
			}
		}
		return {};
	};

//Lisää pelaaja
	factory.addPlayer = function(newPlayer) {
		console.log("New player:" + newPlayer);
		players.push(newPlayer);
	};

// joukkueen pelaajat

var teamsplayers = [
	{tid: 1, pid:1, nick:"tuplakalle", number:"00", active:"true", jdate:"2015-01-01"},
	{tid: 1, pid:2, nick:"piru", number:"0", active:"true"},
	{tid: 1, pid:3, nick:"timppa", number:"5", active:"true"},
	{tid: 1, pid:4, number:"8", active:"true"},
	{tid: 1, pid:5, number:"10", active:"true"},
	{tid: 1, pid:6, number:"19", active:"true"},
	{tid: 1, pid:7, nick:"rio", number:"78", active:"true"},
	{tid: 1, pid:8, number:"4", active:"true"},
	{tid: 1, pid:9, nick:"timmy", number:"25", active:"true"},
	{tid: 1, pid:10, nick:"lipeä", number:"78", active:"false", ldate:"2016-12-01"},
	{tid: 1, pid:11, nick:"loser", number:"1", active:"false", ldate:"2017-03-02"},
	{tid: 2, pid:11, nick:"winner", number:"1"},
	{tid: 1, pid:10, nick:"lipeä", number:"78", active:"true", jdate:"2017-02-02"}
];

// Haetaan kaikki joukkueen pelaajat
	factory.getTeamsPlayers = function(tid) {
		var l = teamsplayers.length;
		var players = [];
		for (var i = 0; i < l; i++) {
			if (tid == teamsplayers[i].tid){
				players.push(teamplayers[i]);
			}
		}
		return players;
	};

//lisää joukkueelle pelaaja
	factory.addTeamsPlayer = function(newTeamsPlayer) {
		console.log("new teamsplayer:" + newTeamsPlayer);
		teamsplayers.push(newTeamsPlayer);
	};

//listaa kaikki kyseisen joukkueet ottelut, pid=playerid, eid=event id
var matches = [
	{id:1, opponent:"Pekan joukkue", date:"2017-02-02",
	playerdata:[
		{pid:1,eventdata:[
			{eid:"1", value:"1"},
			{eid:"2", value:"2"},
			{eid:"3", value:"1"},
			{eid:"4", value:"2"},
			{eid:"5", value:"1"},
			{eid:"6", value:"2"},
			{eid:"7", value:"1"},
			{eid:"8", value:"2"},
			{eid:"9", value:"3"},
			{eid:"10", value:"1"},
			{eid:"11", value:"2"},
			{eid:"12", value:"1"},
			{eid:"13", value:"2"},
			{eid:"14", value:"1"},
			{eid:"15", value:"6"}]
		},
		{pid:2,eventdata:[
			{eid:"1", value:"0"},
			{eid:"2", value:"1"},
			{eid:"3", value:"0"},
			{eid:"4", value:"1"},
			{eid:"5", value:"0"},
			{eid:"6", value:"1"},
			{eid:"7", value:"0"},
			{eid:"8", value:"1"},
			{eid:"9", value:"1"},
			{eid:"10", value:"0"},
			{eid:"11", value:"1"},
			{eid:"12", value:"0"},
			{eid:"13", value:"1"},
			{eid:"14", value:"0"},
			{eid:"15", value:"0"}]
		},
		{pid:3,eventdata:[
			{eid:"1", value:"4"},
			{eid:"2", value:"4"},
			{eid:"3", value:"4"},
			{eid:"4", value:"4"},
			{eid:"5", value:"4"},
			{eid:"6", value:"4"},
			{eid:"7", value:"4"},
			{eid:"8", value:"4"},
			{eid:"9", value:"8"},
			{eid:"10", value:"4"},
			{eid:"11", value:"4"},
			{eid:"12", value:"4"},
			{eid:"13", value:"4"},
			{eid:"14", value:"4"},
			{eid:"15", value:"24"}]
		},
		{pid:4,eventdata:[
			{eid:"1", value:"3"},
			{eid:"2", value:"3"},
			{eid:"3", value:"3"},
			{eid:"4", value:"3"},
			{eid:"5", value:"3"},
			{eid:"6", value:"3"},
			{eid:"7", value:"3"},
			{eid:"8", value:"3"},
			{eid:"9", value:"6"},
			{eid:"10", value:"3"},
			{eid:"11", value:"3"},
			{eid:"12", value:"3"},
			{eid:"13", value:"3"},
			{eid:"14", value:"3"},
			{eid:"15", value:"18"}]
		},
		{pid:5,eventdata:[
			{eid:"1", value:"2"},
			{eid:"2", value:"2"},
			{eid:"3", value:"2"},
			{eid:"4", value:"2"},
			{eid:"5", value:"2"},
			{eid:"6", value:"2"},
			{eid:"7", value:"2"},
			{eid:"8", value:"2"},
			{eid:"9", value:"4"},
			{eid:"10", value:"2"},
			{eid:"11", value:"2"},
			{eid:"12", value:"2"},
			{eid:"13", value:"2"},
			{eid:"14", value:"2"},
			{eid:"15", value:"12"}]
		},
		{pid:6,eventdata:[
			{eid:"1", value:"0"},
			{eid:"2", value:"2"},
			{eid:"3", value:"0"},
			{eid:"4", value:"2"},
			{eid:"5", value:"0"},
			{eid:"6", value:"2"},
			{eid:"7", value:"0"},
			{eid:"8", value:"2"},
			{eid:"9", value:"2"},
			{eid:"10", value:"0"},
			{eid:"11", value:"0"},
			{eid:"12", value:"0"},
			{eid:"13", value:"0"},
			{eid:"14", value:"0"},
			{eid:"15", value:"0"}]
		}
	]},
	{id:2, opponent:"Heikin joukkue", date:"2017-03-03",
	playerdata:[
		{pid:3,eventdata:[
			{eid:"1", value:"1"},
			{eid:"2", value:"2"},
			{eid:"3", value:"1"},
			{eid:"4", value:"2"},
			{eid:"5", value:"1"},
			{eid:"6", value:"2"},
			{eid:"7", value:"1"},
			{eid:"8", value:"2"},
			{eid:"9", value:"3"},
			{eid:"10", value:"1"},
			{eid:"11", value:"2"},
			{eid:"12", value:"1"},
			{eid:"13", value:"2"},
			{eid:"14", value:"1"},
			{eid:"15", value:"6"}]
		},
		{pid:4,eventdata:[
			{eid:"1", value:"0"},
			{eid:"2", value:"1"},
			{eid:"3", value:"0"},
			{eid:"4", value:"1"},
			{eid:"5", value:"0"},
			{eid:"6", value:"1"},
			{eid:"7", value:"0"},
			{eid:"8", value:"1"},
			{eid:"9", value:"1"},
			{eid:"10", value:"0"},
			{eid:"11", value:"1"},
			{eid:"12", value:"0"},
			{eid:"13", value:"1"},
			{eid:"14", value:"0"},
			{eid:"15", value:"0"}]
		},
		{pid:5,eventdata:[
			{eid:"1", value:"4"},
			{eid:"2", value:"4"},
			{eid:"3", value:"4"},
			{eid:"4", value:"4"},
			{eid:"5", value:"4"},
			{eid:"6", value:"4"},
			{eid:"7", value:"4"},
			{eid:"8", value:"4"},
			{eid:"9", value:"8"},
			{eid:"10", value:"4"},
			{eid:"11", value:"4"},
			{eid:"12", value:"4"},
			{eid:"13", value:"4"},
			{eid:"14", value:"4"},
			{eid:"15", value:"24"}]
		},
		{pid:6,eventdata:[
			{eid:"1", value:"3"},
			{eid:"2", value:"3"},
			{eid:"3", value:"3"},
			{eid:"4", value:"3"},
			{eid:"5", value:"3"},
			{eid:"6", value:"3"},
			{eid:"7", value:"3"},
			{eid:"8", value:"3"},
			{eid:"9", value:"6"},
			{eid:"10", value:"3"},
			{eid:"11", value:"3"},
			{eid:"12", value:"3"},
			{eid:"13", value:"3"},
			{eid:"14", value:"3"},
			{eid:"15", value:"18"}]
		},
		{pid:7,eventdata:[
			{eid:"1", value:"2"},
			{eid:"2", value:"2"},
			{eid:"3", value:"2"},
			{eid:"4", value:"2"},
			{eid:"5", value:"2"},
			{eid:"6", value:"2"},
			{eid:"7", value:"2"},
			{eid:"8", value:"2"},
			{eid:"9", value:"4"},
			{eid:"10", value:"2"},
			{eid:"11", value:"2"},
			{eid:"12", value:"2"},
			{eid:"13", value:"2"},
			{eid:"14", value:"2"},
			{eid:"15", value:"12"}]
		},
		{pid:8,eventdata:[
			{eid:"1", value:"0"},
			{eid:"2", value:"2"},
			{eid:"3", value:"0"},
			{eid:"4", value:"2"},
			{eid:"5", value:"0"},
			{eid:"6", value:"2"},
			{eid:"7", value:"0"},
			{eid:"8", value:"2"},
			{eid:"9", value:"2"},
			{eid:"10", value:"0"},
			{eid:"11", value:"0"},
			{eid:"12", value:"0"},
			{eid:"13", value:"0"},
			{eid:"14", value:"0"},
			{eid:"15", value:"0"}]
		}
	]},
];

// otteluiden funktiot
// hakee kaikki
	factory.getMatches = function() {
		return matches;
	};

	factory.getMatch = function(id){
		var l = matches.length;
		for (var i = 0; i < l; i++) {
			if ( id == matches[i].id) {
				return matches[i];
			}
		}
		return {};
	};

	factory.addMatch = function(newMatch) {
		console.log("New match" + newMatch);
		matches.push(newMatch);
	};

	return factory;

});