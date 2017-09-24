var express = require('express');
var router = express.Router();
var PlayerModel = require('../models/player.js');
var TeamPlayerModel = require('../models/playerteam.js');
var ObjectId = require('mongodb').ObjectId;

//PLAYERS
//This will also handle who plays in which team
//add new player (we dont need service to fetch all player, we only fetch players in a team)
router.route('/')
	//fetch all players, this is not used is this service
	.get(function(req, res){
		console.log("get all player");
		PlayerModel.find(function (err, players){
			if (err)
				return res.status(500).send(err);
			res.status(200).send(players);
		});
	})
	//add new player (this does not add to a team)
	.post(function(req, res){
		console.log("saving new player");
		var player = new PlayerModel();
		player.firstname = req.body.firstname;
		player.lastname = req.body.lastname;
		player.save(function(err){
			if (err)
				return res.status(500).send(err);
			res.status(200).send(player);
		});
	});

//single player (no team info), again not really used
router.route('/:playerId')
	.get(function(req, res){
		console.log("Get player id:" + req.params.playerId);
		PlayerModel.findById(req.params.playerId, function(err, player){
			if (err)
				return res.status(500).send(err);
			res.status(200).send(player);
		});
	})
	//update player
	.put(function(req, res){
		console.log("Updating player id" + req.params.playerId);
		PlayerModel.findById(req.params.playerId, function(err, player){
			if (err)
				res.status(500).send(err);

			player.firstname = req.body.firstname;
			player.lastname = req.body.lastname;
			//Save
			player.save(function(err){
				if (err)
					return res.status(500).send(err);
				res.status(200).send(player);
			});
		});
	});

//Teams players
router.route('/team/:teamId')
	//get all players in team
	.get(function(req, res){
		console.log("Get all players in team id:" + req.params.teamId);
		var t_id = new ObjectId(req.params.teamId);
		TeamPlayerModel.find({"team_id": t_id}).populate('player_id').exec(function(err, teamplayers){
			if (err)
				return res.status(500).send(err);
			res.status(200).send(teamplayers);
		});
	})
	//save new player to team
	.post(function(req, res){
		console.log("Adding new player to team id:" + req.params.teamId);
		// create player data, later we might allow moving player from another team, but right now not
		var player = new PlayerModel();
		player.firstname = req.body.firstname;
		player.lastname = req.body.lastname;
		player.save(function(err){
			if (err)
				return res.status(500).send(err);
		});
		// and then save player to team

		var teamplayer = new TeamPlayerModel();
		teamplayer.player_id = player._id;
		teamplayer.team_id = req.params.teamId;
		teamplayer.nickname = req.body.nickname;
		teamplayer.number = req.body.number;
		teamplayer.active = req.body.active;
		if (req.body.leaving_date)
			teamplayer.leaving_date = new Date(req.body.leaving_date);
		if (req.body.joining_date)
			teamplayer.joining_date = new Date(req.body.joining_date);

		teamplayer.save(function(err){
			if (err){
				return res.status(500).send(err);
			}
			console.log(teamplayer);
			res.status(200).send(teamplayer);
		});
	});

//Individual player in a team
router.route('/team/:teamId/:playerId')
	//get player, will be using teamplayer id in playerId value instead on player
	.get(function(req, res){
		console.log("Get player id " + req.params.playerId + " from team id " + req.params.teamId);
		TeamPlayerModel.findById(req.params.playerId).populate('player_id').exec(function(err, teamplayer){
			if(err)
				return res.status(500).send(err);
			res.status(200).send(teamplayer);
		});
	})
	//update player data
	.put(function(req, res){
		console.log("Updating player id " + req.params.playerId + "in team id " + req.params.teamId);
		TeamPlayerModel.findById(req.params.playerId, function(err, teamplayer){
			if(err)
				return res.status(500).send(err);

			teamplayer.nickname = req.body.nickname;
			teamplayer.number = req.body.number;
			teamplayer.active = req.body.active;
			if (req.body.leaving_date)
				teamplayer.leaving_date = new Date(req.body.leaving_date);
			if (req.body.joining_date)
				teamplayer.joining_date = new Date(req.body.joining_date);

			PlayerModel.findById(teamplayer.player_id, function(err, player){
				if(err)
					return res.status(500).send(err)

				player.firstname = req.body.firstname;
				player.lastname = req.body.lastname;

				player.save(function(err){
					if(err)
						return res.status(500).send(err)
				});
			});
			teamplayer.save(function(err){
				if(err)
					return res.status(500).send(err)
				res.status(200).send(teamplayer);
			});
		});
	});

module.exports = router;