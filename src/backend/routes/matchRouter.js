var express = require('express');
var router = express.Router();
var MatchModel = require('../models/match.js');
var ObjectId = require('mongodb').ObjectId;

//There no need to fetch all the games, only fetches or saves toward a single team are needed
router.route('/team/:teamId')
	//get all matches of the team
	.get(function(req,res){
		console.log("Get all matches for team "+req.params.teamId);
		var t_id = new ObjectId(req.params.teamId);
		MatchModel.find({"team_id":t_id}).exec(function(err, teammatches){
			if(err)
				res.status(500).send(err);
			res.status(200).send(teammatches);
		});
	})
	//save new match for team
	.post(function(req,res){
		console.log("Save new match for team "+req.params.teamId);
		var match = new MatchModel();
		match.team_id = req.params.teamId;
		match.opponent = req.body.opponent;
		
		if(req.body.matchday)
			match.date = new Date(req.body.matchday); 

		match.players = [];
		for(var player in req.body.players){
			if (player == 'key') { continue; };
			var playerevent = {};
			playerevent.player_id = player;
			playerevent.events = [];
			for(var event in req.body.players[player]){
				var matchevent = {};
				matchevent.event_id = event;
				matchevent.value = req.body.players[player][event];
				playerevent.events.push(matchevent);
			};
			match.players.push(playerevent);
		};

		match.save(function(err){
			if (err)
				return res.status(500).send(err);
			res.status(200).send('ok');
		});

	});

//get one certain match from a team
router.route('/team/:teamId/:matchId')
	//only get cause no support for update
	.get(function(req,res){
		console.log("Get match "+req.params.matchId+" from team "+req.params.teamId);
		MatchModel.findById(req.params.matchId, function(err, teammatch){
			if(err)
				return res.status(500).send(err);
			res.status(200).send(teammatch);
		});
	});

module.exports = router;