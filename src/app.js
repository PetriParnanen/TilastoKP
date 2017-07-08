var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname,"app")));
app.use(bodyParser.json());

var teams = [
	{id:1, name:"Skuuppi joukkue"},
	{id:2, name:"Kikka joukkue"}
];

app.get("/api/teamlist", function(req,res) {
		console.log("get all teams");
		res.send(JSON.stringify(teams));	
});

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

app.post("/api/teamlist/:id", function(req,res) {
	console.log("saving new team");
		var newitem = {};
		newteam.id = req.body.id;
		newteam.name = req.body.name;
		teams.push(newteam);
		console.log(newteam);
});

app.listen(3000);