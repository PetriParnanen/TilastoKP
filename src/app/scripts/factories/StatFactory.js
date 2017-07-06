angular.module('StatFactory', []).factory('teamFactory', function(){

// yhden joukkueen tietoja käsitellään
// Functiot muuttuvat resource kutsuiksi myöhemmin elämässä

	var factory={};

teams = [
	{id:1, name:"Skuuppi joukkue"}
];

// joukkue funktiot, näistä vain haut nyt alkuun käytössä
	factory.getTeams = function() {
		return teams;
	};

	factory.getTeam = function(id){
		var l = teams.length;
		for (var i = 0; i < l; i++) {
			if ( id == teams[i].id) {
				return teams[i];
			}
		}
		return {};
	};

	factory.addTeam = function(newTeam) {
		console.log("New team" + newTeam);
		teams.push(newTeam);
	};

// Listaa lajin tapahtumat
var events = [
	{id:1, desc:"Onnistunut 2P heitto", abbr:"O2P", order:"1"},
	{id:2, desc:"2P heittoyritys", abbr:"H2P", order:"2"},
	{id:3, desc:"Onnistunut 3P heitto", abbr:"O3P", order:"3"},
	{id:4, desc:"3P heittoyritys", abbr:"H3P", order:"4"},
	{id:5, desc:"Onnistunut vapaaheitto", abbr:"O1P", order:"5"},
	{id:6, desc:"Vapaaheitto yritys", abbr:"H1P", order:"6"},
	{id:7, desc:"Hyökkäys levypallo", abbr:"HL", order:"7"},
	{id:8, desc:"Puolustus levypallo", abbr:"PL", order:"8"},
	{id:9, desc:"Levypallot yhteensä", abbr:"LEV", order:"9",sum:"@7 + @8"},
	{id:10, desc:"Syötöt", abbr:"S",order:"10"},
	{id:11, desc:"Menetykset", abbr:"M", order:"11"},
	{id:12, desc:"Riistot", abbr:"R", order:"12"},
	{id:13, desc:"Torjunnat", abbr:"T", order:"13"},
	{id:14, desc:"Virheet", abbr:"V", order:"14"},
	{id:15, desc:"Pisteet", abbr:"PIST", order:"15",sum:"@1*2+@3*3+@5*1"}
];

// tapahtumien funktiot
// hakee kaikki
	factory.getEvents = function() {
		return events;
	};

	factory.getEvent = function(id){
		var l = events.length;
		for (var i = 0; i < l; i++) {
			if ( id == events[i].id) {
				return events[i];
			}
		}
		return {};
	};

	factory.addEvent = function(newEvent) {
		console.log("New event" + newEvent);
		events.push(newEvent);
	};

// Listaa pelaajat kyseisessä joukkueessa

var players = [ 
	{id: 1, name:"kalle", number="00", active:"true"},
	{id: 2, name:"pekka", number="0", active:"true"},
	{id: 3, name:"timo", number="5", active:"true"},
	{id: 4, name:"samu", number="8", active:"true"},
	{id: 5, name:"veikko", number="10", active:"true"},
	{id: 6, name:"pekka p", number="19", active:"true"},
	{id: 7, name:"simon", number="4", active:"true"},
	{id: 8, name:"reiska", number="78", active:"true"},
	{id: 9, name:"timothy", number="25", active:"true"},
	{id: 10, name:"repoman", number="78", active:"false", ldate="2017-01-01"},
	{id: 11, name:"repman", number="1", active:"false",
	 ldate="2017-03-02"}
];

// pelaaja funktiot
// hakee kaikki
	factory.getPlayers = function() {
		return players;
	};

	factory.getPlayer = function(id){
		var l = players.length;
		for (var i = 0; i < l; i++) {
			if ( id == players[i].id) {
				return players[i];
			}
		}
		return {};
	};

	factory.addPlayer = function(newPlayer) {
		console.log("New player" + newPlayer);
		players.push(newPlayer);
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

//ja sitten pois
	return factory;

});