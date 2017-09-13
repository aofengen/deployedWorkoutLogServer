const router = require('express').Router();
const sequelize = require('../db.js');
const Log = sequelize.import('../models/log.js');
const User = sequelize.import('../models/user.js');
const Definition = sequelize.import('../models/definition.js');

router.post('/', function(req, res) {
	let date = req.body.log.date;
	let description = req.body.log.desc;
	let result = req.body.log.result;
	let user = req.user;
	let definition = req.body.log.def;
	let intensity = req.body.log.int;

	Log
		.create({
			date: date,
			desc: description,
			result: result,
			owner: user.id,
			def: definition,
			int: intensity
		})
		.then(
			function createSuccess(log) {
				res.json(log);
			},
			function createError(err) {
				res.send(500, err.message)
			}
		);
});

router.get('/', function(req,res) {
	let userid = req.user.id;

	Log
	.findAll({
	where: {owner: userid}
	})
	.then(
		function findAllSuccess(data){
			//console.log(data);
			res.json(data);
		},
		function findAllError(err){
			res.send(500, err.message);
		}
	);
});

//This will retrieve one workout specified by the log id
router.get('/:id', function(req, res) {
	let data = req.params.id;
	Log
		.findOne({
			where: {id: data}
		}).then(
		function getSuccess(updateData) {
			res.json(updateData);
		},
		function getError(err) {
			res.send(500, err.message)
		}
	);
})

//this will return the data from the log that was updated
router.put('/', function(req, res) {
	let description = req.body.log.desc;
	let result = req.body.log.result;
	let data = req.body.log.id;
	let definition = req.body.log.def;
	let intensity = req.body.log.int;

	console.log(req);
	Log
	.update(
		{
			description: description,
			result: result,
			def: definition,
			int: intensity
		},
		{where: {id:data}}
	).then(
		function updateSuccess(updatedLog) {
			Log.sync();
			res.json(updatedLog);
		},
		function updateError(err) {
			res.send(500, err.message);
		}
	)
})

router.delete('/', function(req,res) {
	let data = req.body.log.id;
	Log
		.destroy({
			where: {id: data}
		}).then(
		function deleteLogSuccess(data) {
			res.send("you removed a log");
		},
		function deleteLogError(err) {
			res.send(500, err.message);
		}
	)
});

module.exports = router;