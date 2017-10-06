var express = require('express');
var router = express.Router();
var SportModel = require('../models/sport.js');
var EventModel = require('../models/event.js');

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

//get events for individual sport
router.route('/event/:sportId')
	.get(function(req,res){
		console.log("Fetching events for sport id" + req.params.sportId);
		EventModel.find({sportId:req.params.sportId}, function(err, events){
			if(err)
				res.status(500).send(err);
			res.status(200).send(events);
		});
	})
//save events for sport
	.post(function(req,res){
		console.log("Saving new event for sport id" + req.params.sportId);
		var event = new EventModel;
		event.sportId = req.params.sportId;
		event.description = req.body.description;
		event.abbreviation = req.body.abbreviation;
		event.order = req.body.order;
		event.sumfield = req.body.sumfield;
		event.receiptOnly = req.body.receiptOnly;

		event.save(function(err){
			if(err)
				res.status(500).send(err);
			res.status(200).send(event);
		});
	});


module.exports = router;