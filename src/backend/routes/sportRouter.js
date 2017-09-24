var express = require('express');
var router = express.Router();
var SportModel = require('../models/sport.js');

// SPORTS
// listing and adding new
router.route('/')
    //get list of all sports
    .get(function(req, res) {
		console.log("get all sports");
		SportModel.find(function (err, sports){
			if (err)
				res.status(500).send(err);			
			res.status(200).send(sports);
		});
	})
	//create new sport
	.post(function(req, res){
		console.log("Saving new sport");
		var sport = new SportModel();
		sport.name = req.body.name;

		sport.save(function(err){
			if(err)
				res.status(500).send(err);
			res.status(200).send(sport)
		});
	});

//Get individual sport (there's no need to edit one)
router.route('/:sportId').get(function(req, res){
	console.log("Fetching sport id:" + req.params.sportId);
	SportModel.findById(req.params.sportId, function(err, sport){
		if (err)
			res.status(500).send(err);
		res.status(200).send(sport);
	});
});

module.exports = router;