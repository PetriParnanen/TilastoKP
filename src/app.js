var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname,"app")));
app.use(bodyParser.json());

//team api
var teams = [
	{id:1, name:"Skuuppi joukkue"},
	{id:2, name:"Kikka joukkue"}
];

//get all teams
app.get("/api/teamlist", function(req,res) {
	console.log("get all teams");
	res.send(JSON.stringify(teams));	
});

//get team
app.get("/api/teamlist/:id", function(req,res) {
	console.log("get team id:"+req.params.id);
	var id = req.params.id;
	var l = teams.length;
	for (var i = 0; i < l; i++) {
		console.log(teams[i]);
		if (id == teams[i].id) {
			res.send(JSON.stringify(teams[i]));
			return;
		}
	}
	var empty = {};
	res.send(JSON.stringify(empty));
});

//add team
app.post("/api/teamlist/:id", function(req,res) {
	console.log("saving new team");
	var newitem = {};
	newteam.id = req.body.id;
	newteam.name = req.body.name;
	teams.push(newteam);
	console.log(newteam);
});

//event api
var events = [
	{sportid:"1",
	eventdata: [
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
	]},
	{sportid:"2",
	eventdata: [
		{id:16, sportid:"2", desc:"Maalit", abbr:"G", order:"1"}
	]}
];

//all events for one sport
app.get("/api/eventlist/sport/:sportid", function(req,res) {
	console.log("get all events for sport:"+req.params.sportid);
	var sportid = req.params.sportid;
	var l = events.length;
	for (var i = 0; i < l; i++){
		if (sportid = events[i].sportid) {
			res.send(JSON.stringify(events[i]));
			return;
		}
	}
	var empty = {};
	res.send(JSON.stringify(empty));
});

//event for sport
app.get("/api/eventlist/sport/:sportid/id:id", function(req,res) {
	console.log("get event id:"+req.params.id+" for sport:"+req.params.id);
	var sportid = req.params.sportid;
	var id = req.params.id;
	var l = events.length;
	for (var i = 0; i < l; i++) {
		if (sportid == events[i].sportid) {
			var m = events[i].eventdata.length;
			for (var j = 0; j < m; j++){
				res.send(JSON.stringify(events[i].eventdata[j]));
				return;
			}
		}
	}
	var empty = {};
	res.send(JSON.stringify(empty));
});

//add new event for sport, if new sport add also new sport
app.post("/api/eventlist/sport/:sportid/id:id", function(req,res) {
	console.log("saving new event");
	var sportid = req.params.sportid;
	var l = events.length;
	for (var i = 0; i < l; i++){
		if (sportid == events[i].sportid) {
			console.log("New event for sport:"+reg.params.sportid);
			my newevent = {};
			newevent.id = req.body.id;
			newevent.desc = req.body.desc;
			newevent.abbr = req.body.abbr;
			newevent.order = req.body.order;
			newevent.sum = req.body.sum;
			events[i].events.push(newevent);
			return;
		}
	}
	var newsport = {};
	newsport.sportid = req.body.sportid;
	newsport.eventdata = req.body.eventdata;
	events.push(newsport);
});


//players api handles player info and player team connections
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

//players in certain teams
var teamsplayers = [
	{tid: 1,
	players: [
		{pid:1, nick:"tuplakalle", number:"00", active:"true", jdate:"2015-01-01"},
		{pid:2, nick:"piru", number:"0", active:"true"},
		{pid:3, nick:"timppa", number:"5", active:"true"},
		{pid:4, number:"8", active:"true"},
		{pid:5, number:"10", active:"true"},
		{pid:6, number:"19", active:"true"},
		{pid:7, nick:"rio", number:"78", active:"true"},
		{pid:8, number:"4", active:"true"},
		{pid:9, nick:"timmy", number:"25", active:"true"},
		{pid:10, nick:"lipeä", number:"78", active:"false", ldate:"2016-12-01"},
		{pid:11, nick:"loser", number:"1", active:"false", ldate:"2017-03-02"},
		{pid:10, nick:"lipeä", number:"78", active:"true", jdate:"2017-02-02"}
	]},
	{tid: 2,
	players: [
		{pid:11, nick:"winner", number:"1", jdate:"2017-03-02"}
	]}	
];

//all players in a team
app.get("/api/playerlist/team/:teamid", function(req,res) {
	console.log("get all players for team:"+req.params.teamid);
	var tid = req.params.teamid;
	var l = teamsplayers.length;
	for (var i = 0; i < l; i++){
		if (teamid = teamsplayer[i].tid) {
			// adding nick if it doesnt exists (firstname)
			var m = teamsplayers[i].players.length;
			for (var j = 0; j < m; j++) {
				if (!teamsplayers[i].players[j].nick) {
					var n = players.length;
					for (var k = 0; k < n; k++){
						teamsplayers[i].players[j].nick = players[k].fname;
					}
				}
			}
			res.send(JSON.stringify(teamsplayers[i]));
			return;
		}
	}
	var empty = {};
	res.send(JSON.stringify(empty));
});

//get one players team data
app.get("/api/playerlist/team/:teamid/player:playerid", function(req,res) {
	console.log("get players:"+req.params.teamid+" team data from team:"+req.params.teamid);
	var tid = req.params.teamid;
	var pid = req.params.playerid;
	var l = teamsplayers.length;
	for (var i = 0; i < l; i++){
		if (teamid = teamsplayers[i].tid) {
			var m = teamsplayers[i].players.length;
			for (var j = 0; j < m; j++){
				if (teamsplayers[i].players[j].pid = pid){
					res.send(JSON.stringify(teamsplayers[i].players[j]));
					return;
				}
			}
		}
	}
	var empty = {};
	res.send(JSON.stringify(empty));
});

//fetch one player name
app.get("/api/player/:playerid", function(req,res) {
	console.log("get name of player:"+req.params.playerid);
	var pid = req.params.playerid;
	var l = players.length;
	for (var i = 0; i < l; i++){
		if (pid = players[i].id){
			res.send(JSON.stringify(players[i]));
			return;
		}
	}
	var empty = {};
	res.send(JSON.stringify(empty));
});

// create new player to team
app.post("/api/playerlist/team:teamid/player:playerid", function(req,res) {
	console.log("add new player:"+req.params.playerid+" to team"+req.params.teamid);
	// create players table row
	var pid = req.params.playerid;
	var tid = req.params.teamid;

	var newplayer = {};
	newplayer.id = pid;
	newplayer.fname = req.body.fname;
	newplayer.lname = req.body.lname;
	players.push(newplayer);

	//adding player to 
	var newteamsplayer = {};
	newteamsplayer.id = pid;
	newteamsplayer.nick = req.body.nick;
	newteamsplayer.number = req.body.number;
	newteamsplayer.active = "true";
	newteamsplayer.jdate = req.body.jdate;

	var l = teamsplayers.length;
	for (i = 0; i < l; i++){
		if (teamsplayers[i].id = tid){
			teamsplayers[i].players.push(newteamsplayer));
			return;
		}
	}
})

//ottelut
//listaa kaikki kyseisen joukkueet ottelut, pid=playerid, eid=event id
var matches = [
	{tid:"1", matchdata:[
		{id:1, opponent:"Pekan joukkue", date:"2017-02-02",
		playerdata:[
			{pid:1,eventdata:[
				{eid:"1", value:"1"}, {eid:"2", value:"2"}, {eid:"3", value:"1"},
				{eid:"4", value:"2"}, {eid:"5", value:"1"}, {eid:"6", value:"2"},
				{eid:"7", value:"1"}, {eid:"8", value:"2"}, {eid:"9", value:"3"},
				{eid:"10", value:"1"}, {eid:"11", value:"2"}, {eid:"12", value:"1"},
				{eid:"13", value:"2"}, {eid:"14", value:"1"}, {eid:"15", value:"6"}]
			},
			{pid:2,eventdata:[
				{eid:"1", value:"0"}, {eid:"2", value:"1"}, {eid:"3", value:"0"},
				{eid:"4", value:"1"}, {eid:"5", value:"0"}, {eid:"6", value:"1"},
				{eid:"7", value:"0"}, {eid:"8", value:"1"}, {eid:"9", value:"1"},
				{eid:"10", value:"0"}, {eid:"11", value:"1"}, {eid:"12", value:"0"},
				{eid:"13", value:"1"}, {eid:"14", value:"0"}, {eid:"15", value:"0"}]
			},
			{pid:3,eventdata:[
				{eid:"1", value:"4"}, {eid:"2", value:"4"}, {eid:"3", value:"4"},
				{eid:"4", value:"4"}, {eid:"5", value:"4"}, {eid:"6", value:"4"},
				{eid:"7", value:"4"}, {eid:"8", value:"4"}, {eid:"9", value:"8"},
				{eid:"10", value:"4"}, {eid:"11", value:"4"}, {eid:"12", value:"4"},
				{eid:"13", value:"4"}, {eid:"14", value:"4"}, {eid:"15", value:"24"}]
			},
			{pid:4,eventdata:[
				{eid:"1", value:"3"}, {eid:"2", value:"3"}, {eid:"3", value:"3"},
				{eid:"4", value:"3"}, {eid:"5", value:"3"}, {eid:"6", value:"3"},
				{eid:"7", value:"3"}, {eid:"8", value:"3"}, {eid:"9", value:"6"},
				{eid:"10", value:"3"}, {eid:"11", value:"3"}, {eid:"12", value:"3"},
				{eid:"13", value:"3"}, {eid:"14", value:"3"}, {eid:"15", value:"18"}]
			},
			{pid:5,eventdata:[
				{eid:"1", value:"2"}, {eid:"2", value:"2"}, {eid:"3", value:"2"},
				{eid:"4", value:"2"}, {eid:"5", value:"2"}, {eid:"6", value:"2"},
				{eid:"7", value:"2"}, {eid:"8", value:"2"}, {eid:"9", value:"4"},
				{eid:"10", value:"2"}, {eid:"11", value:"2"}, {eid:"12", value:"2"},
				{eid:"13", value:"2"}, {eid:"14", value:"2"}, {eid:"15", value:"12"}]
			},
			{pid:6,eventdata:[
				{eid:"1", value:"0"}, {eid:"2", value:"2"}, {eid:"3", value:"0"},
				{eid:"4", value:"2"}, {eid:"5", value:"0"}, {eid:"6", value:"2"},
				{eid:"7", value:"0"}, {eid:"8", value:"2"}, {eid:"9", value:"2"},
				{eid:"10", value:"0"}, {eid:"11", value:"0"}, {eid:"12", value:"0"},
				{eid:"13", value:"0"}, {eid:"14", value:"0"}, {eid:"15", value:"0"}]
			}
		]},
		{id:2, opponent:"Heikin joukkue", date:"2017-03-03",
		playerdata:[
			{pid:3,eventdata:[
				{eid:"1", value:"1"}, {eid:"2", value:"2"}, {eid:"3", value:"1"},
				{eid:"4", value:"2"}, {eid:"5", value:"1"}, {eid:"6", value:"2"},
				{eid:"7", value:"1"}, {eid:"8", value:"2"}, {eid:"9", value:"3"},
				{eid:"10", value:"1"}, {eid:"11", value:"2"}, {eid:"12", value:"1"},
				{eid:"13", value:"2"}, {eid:"14", value:"1"}, {eid:"15", value:"6"}]
			},
			{pid:4,eventdata:[
				{eid:"1", value:"0"}, {eid:"2", value:"1"}, {eid:"3", value:"0"},
				{eid:"4", value:"1"}, {eid:"5", value:"0"}, {eid:"6", value:"1"},
				{eid:"7", value:"0"}, {eid:"8", value:"1"}, {eid:"9", value:"1"},
				{eid:"10", value:"0"}, {eid:"11", value:"1"}, {eid:"12", value:"0"},
				{eid:"13", value:"1"}, {eid:"14", value:"0"}, {eid:"15", value:"0"}]
			},
			{pid:5,eventdata:[
				{eid:"1", value:"4"}, {eid:"2", value:"4"}, {eid:"3", value:"4"},
				{eid:"4", value:"4"}, {eid:"5", value:"4"}, {eid:"6", value:"4"},
				{eid:"7", value:"4"}, {eid:"8", value:"4"}, {eid:"9", value:"8"},
				{eid:"10", value:"4"}, {eid:"11", value:"4"}, {eid:"12", value:"4"},
				{eid:"13", value:"4"}, {eid:"14", value:"4"}, {eid:"15", value:"24"}]
			},
			{pid:6,eventdata:[
				{eid:"1", value:"3"}, {eid:"2", value:"3"}, {eid:"3", value:"3"},
				{eid:"4", value:"3"}, {eid:"5", value:"3"}, {eid:"6", value:"3"},
				{eid:"7", value:"3"}, {eid:"8", value:"3"}, {eid:"9", value:"6"},
				{eid:"10", value:"3"}, {eid:"11", value:"3"}, {eid:"12", value:"3"},
				{eid:"13", value:"3"}, {eid:"14", value:"3"}, {eid:"15", value:"18"}]
			},
			{pid:7,eventdata:[
				{eid:"1", value:"2"}, {eid:"2", value:"2"}, {eid:"3", value:"2"},
				{eid:"4", value:"2"}, {eid:"5", value:"2"}, {eid:"6", value:"2"},
				{eid:"7", value:"2"}, {eid:"8", value:"2"}, {eid:"9", value:"4"},
				{eid:"10", value:"2"}, {eid:"11", value:"2"}, {eid:"12", value:"2"},
				{eid:"13", value:"2"}, {eid:"14", value:"2"}, {eid:"15", value:"12"}]
			},
			{pid:8,eventdata:[
				{eid:"1", value:"0"}, {eid:"2", value:"2"}, {eid:"3", value:"0"},
				{eid:"4", value:"2"}, {eid:"5", value:"0"}, {eid:"6", value:"2"},
				{eid:"7", value:"0"}, {eid:"8", value:"2"}, {eid:"9", value:"2"},
				{eid:"10", value:"0"}, {eid:"11", value:"0"}, {eid:"12", value:"0"},
				{eid:"13", value:"0"}, {eid:"14", value:"0"}, {eid:"15", value:"0"}]
			}
		]}
	]}
];

//get all matches for team X
app.get("/api/matchlist/team/:teamid", function(req,res) {
	console.log("get all matchess for team:"+req.params.teamid);
	var tid = req.params.teamid;
	var l = teamsplayers.length;
	for (var i = 0; i < l; i++){
		if (teamid = matches[i].tid) {
			res.send(JSON.stringify(matches[i]));
			return;
		}
	}
	var empty = {};
	res.send(JSON.stringify(empty));
});

//get match
app.get("/api/matchlist/team/:teamid/match:matchid", function(req,res) {
	console.log("get match:"+req.params.matchid+" from team:"+req.params.teamid);
	var tid = req.params.teamid;
	var mid = req.params.matchid;
	var l = matches.length;
	for (var i = 0; i < l; i++){
		if (tid = matches[i].tid) {
			var m = matches[i].matchdata.length;
			for (var j = 0; j < m; j++){
				if (matches[i].matchdata[j].id = mid){
					res.send(JSON.stringify(matches[i].matchdata[j]));
					return;
				}
			}
		}
	}
	var empty = {};
	res.send(JSON.stringify(empty));
});

//save match
app.post("/api/matchlist/team:teamid/match:matchid", function(req,res) {
	console.log("save match");
	var tid = req.params.teamid;
	var mid = req.params.matchid;
	
	var newmatch = {};
	newmatch.id = mid;
	newmatch.opponent = req.body.opponent;
	newmatch.date = req.body.date;
	newmatch.playerdata = req.body.playerdata;
	var l = matches.length;

	for (var i = 0; i < l; i++){
		if (tid == matches[i].tid){
				matches[i].matchdata.push(newmatch);
				return;
		}
	}
	var newteammatch = {};
	newteammatch.tid = tid;
	newteammatch.matchdata = newmatch;
	matches.push(newteammatch);

});


app.listen(3000);