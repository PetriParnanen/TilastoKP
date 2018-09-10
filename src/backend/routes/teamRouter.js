var express = require('express');
var router = express.Router();
var TeamModel = require('../models/team.js');

//TEAMS
//at some point teams per user is needed
router.route('/')
	//get all teams for user
	.get(function(req, res){
		console.log("get all teams");
		var user = req.decoded.username; // getting user data from token
		console.log(user);
		TeamModel.find({ user: user }).populate('sportId').exec(function (err, teams){
			if (err)
				res.status(500).send(err);
			res.status(200).send(teams);
		});
	})
	// save new team
	.post(function(req, res){
		console.log("Saving new team");
		console.log(req.body);
		var team = new TeamModel();
		team.user = req.decoded.username;
		team.name = req.body.name;
		team.sportId = req.body.sport;

		console.log(team);
		team.save(function(err){
			if(err)
				res.status(500).send(err);
			res.status(200).send(team);
		});
	});

//individual teams
router.route('/:teamId')
	//Fetch one team
	.get(function(req, res){
		console.log("Fetch team id:" +req.params.teamId);
		TeamModel.findById(req.params.teamId).populate('sportId').exec(function(err, team){
			if(err)
				res.status(500).send(err);
			res.status(200).send(team);
		});
	})
	//update
	.put(function(req, res){
		console.log("Updating team id:" +req.params.teamId);
		TeamModel.findById(req.params.teamId, function(err, team){
			if (err)
				res.status(500).send(err);

			team.name = req.body.name; // update name, cant change sport
			// Save
			team.save(function(err){
				if(err)
					res.status(500).send(err);
				res.status(200).send(team);
			});
		});
	})
	//delete
	.delete(function(req, res){
		console.log("Delete team id:"+req.params.teamId);
		TeamModel.findByIdAndRemove(req.params.teamId, function(err){
			if(err)
				res.status(500).send(err);
			res.status(200).send({"message":"Team removed"});
		});
	});

module.exports = router;